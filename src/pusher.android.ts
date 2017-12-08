import { Common, Options } from './pusher.common';
export class TNSPusher extends Common {
  private _options;
  android: com.pusher.client.Pusher;

  constructor(apiKey: string, options?: Options) {
    super();
    this.channels = new Map();
    this.presenceChannels = new Map();
    this.privateChannels = new Map();
    this.eventChannels = new Map();
    this.privateEventChannels = new Map();
    if (options) {
      this._options = new com.pusher.client.PusherOptions();
      if (options.activityTimeout) {
        this._options.setActivityTimeout(options.activityTimeout);
      }
      if (options.authorizer) {
        const _authorizer = new com.pusher.client.util.HttpAuthorizer(
          options.authorizer
        );
        this._options.setAuthorizer(_authorizer);
      }
      if (options.cluster) {
        this._options.setCluster(options.cluster);
      }
      if (options.encrypted) {
        this._options.setEncrypted(options.encrypted);
      }
      if (options.host) {
        this._options.setHost(options.host);
      }
      if (options.pongTimeout) {
        this._options.setPongTimeout(options.pongTimeout);
      }
      if (options.wsPort) {
        this._options.setWsPort(options.wsPort);
      }
      if (options.wssPort) {
        this._options.setWssPort(options.wssPort);
      }
      this.android = new com.pusher.client.Pusher(apiKey, this._options);
    } else {
      this.android = new com.pusher.client.Pusher(apiKey);
    }
  }
  connect(callback?: Function): void {
    if (typeof callback === 'function') {
      this.android.connect(
        new com.pusher.client.connection.ConnectionEventListener({
          onConnectionStateChange(change) {
            callback(null, [
              {
                current: change.getCurrentState(),
                previous: change.getPreviousState()
              }
            ]);
          },
          onError(message, code, e) {
            callback(new Error(message));
          }
        }),
        <any>[com.pusher.client.connection.ConnectionState.ALL]
      );
    } else {
      this.android.connect();
    }
  }
  disconnect(): void {
    this.android.disconnect();
  }
  getChannel(channelName: string) {
    return this.android.getChannel(channelName);
  }
  getConnection() {
    return this.android.getConnection();
  }
  getPresenceChannel(channelName: string) {
    return this.android.getPresenceChannel(channelName);
  }
  getPrivateChannel(channelName: string) {
    return this.android.getPrivateChannel(channelName);
  }

  subscribeToChannelEvent(
    channelName: string,
    event: string,
    callback?: Function
  ): void {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName)['channel'];
      if (channel && !channel.isSubscribed()) {
        (channel as any).bind(
          event,
          new com.pusher.client.channel.SubscriptionEventListener({
            onEvent(cName: string, eName: string, data: string) {
              callback({
                channel: cName,
                eventName: eName,
                data: data
              });
            }
          })
        );
        this.eventChannels.set(`${channel}_${event}`, {
          channel: channel,
          callback: callback
        });
      }
    } else {
      this.subscribeToChannel(channelName);
      this.subscribeToChannelEvent(channelName, event, callback);
    }
  }

  subscribeToChannel(channelName: string, callback?: Function): void {
    if (channelName) {
      if (!this.channels.has(channelName)) {
        let channel;
        if (typeof callback === 'function') {
          const listener = new com.pusher.client.channel.ChannelEventListener(
            <any>{
              onSubscriptionSucceeded(cName: string) {
                callback(null, { channelName: channelName });
              }
            }
          );
          channel = this.android.subscribe(channelName, <any>listener, <any>[]);
        } else {
          channel = this.android.subscribe(channelName);
        }
        this.channels.set(channelName, {
          channel: channel,
          callback: callback
        });
      }
    }
  }

  subscribePresence(channelName: string, callback?: Function): void {
    if (!this.presenceChannels.has(channelName)) {
      let presenceChannel;
      if (typeof callback === 'function') {
        presenceChannel = (this.android as any).subscribePresence(
          channelName,
          new com.pusher.client.channel.PresenceChannelEventListener(<any>{
            onUsersInformationReceived(channelName, users) {
              callback(null, {
                channel: channelName,
                users: users
              });
            },
            userSubscribed(channelName, user) {
              callback(null, {
                channel: channelName,
                user: user
              });
            },
            userUnsubscribed(channelName, user) {
              callback(null, {
                channel: channelName,
                user: user
              });
            },
            onAuthenticationFailure(message: string, e: string) {
              callback(message, null);
            }
          })
        );
      } else {
        this.android.subscribePresence(channelName);
      }
      this.presenceChannels.set(channelName, {
        channel: presenceChannel,
        callback: callback
      });
    }
  }

  subscribeToPrivateChannel(channelName: string, callback?: Function): void {
    if (!this.privateChannels.has(channelName)) {
      let privateChannel;
      if (typeof callback === 'function') {
        privateChannel = (this.android as any).subscribePrivate(
          channelName,
          new com.pusher.client.channel.PrivateChannelEventListener(<any>{
            onAuthenticationFailure(message: string, e: any) {
              callback(message, null);
            },
            onSubscriptionSucceeded(channelName: string) {
              callback(null, { channel: channelName });
            }
          })
        );
      } else {
        privateChannel = this.android.subscribePrivate(channelName);
      }
      this.privateChannels.set(channelName, {
        channel: privateChannel,
        callback: callback
      });
    }
  }
  subscribeToPrivateChannelEvent(
    channelName: string,
    event: string,
    callback?: Function
  ): void {
    if (this.privateChannels.has(channelName)) {
      const channel = this.privateChannels.get(channelName)['channel'];
      if (channel && !channel.isSubscribed()) {
        (channel as any).bind(
          event,
          new com.pusher.client.channel.SubscriptionEventListener({
            onEvent(cName: string, eName: string, data: string) {
              callback({
                channel: cName,
                eventName: eName,
                data: data
              });
            }
          })
        );
        this.privateEventChannels.set(`${channel}_${event}`, {
          channel: channel,
          callback: callback
        });
      }
    } else {
      this.subscribeToPrivateChannel(channelName);
      this.subscribeToPrivateChannelEvent(channelName, event, callback);
    }
  }
  unsubscribe(channelName: string): void {
    this.android.unsubscribe(channelName);
    this.channels.delete(channelName);
  }
  unsubscribePrivate(channelName: string): void {
    this.unsubscribe(channelName);
    this.privateChannels.delete(channelName);
  }
}

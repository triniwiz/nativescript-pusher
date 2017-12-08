import { Common } from './pusher.common';
import { Options } from './interfaces';
import { ConnectionStatus } from './enums';
export * from './interfaces';
export * from './enums';
export class Pusher extends Common {
  private _options;
  android: com.pusher.client.Pusher;

  constructor(apiKey: string, options?: Options) {
    super();
    this.channelsCallback = new Map();
    this.presenceChannelsCallback = new Map();
    this.privateChannelsCallback = new Map();
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
  private getConnectionStatus(status): ConnectionStatus {
    switch (status) {
      case com.pusher.client.connection.ConnectionState.CONNECTED:
        return ConnectionStatus.CONNECTED;
      case com.pusher.client.connection.ConnectionState.CONNECTING:
        return ConnectionStatus.CONNECTING;
      case com.pusher.client.connection.ConnectionState.DISCONNECTED:
        return ConnectionStatus.DISCONNECTED;
      case com.pusher.client.connection.ConnectionState.DISCONNECTING:
        return ConnectionStatus.DISCONNECTING;
      default:
        return ConnectionStatus.RECONNECTING;
    }
  }

  connect(callback?: Function): void {
    if (typeof callback === 'function') {
      const ref = new WeakRef(this);
      this.android.connect(
        new com.pusher.client.connection.ConnectionEventListener({
          onConnectionStateChange(change) {
            const owner = ref.get();
            callback(null, {
              current: owner.getConnectionStatus(change.getCurrentState()),
              previous: owner.getConnectionStatus(change.getPreviousState())
            });
          },
          onError(message, code, e) {
            callback(message, null);
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
  subscribeToChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void {
    const channel = this.android.getChannel(channelName);
    if (channel) {
      if (channel && !channel.isSubscribed()) {
        const ref = new WeakRef(this);
        const binding = new com.pusher.client.channel.SubscriptionEventListener(
          {
            onEvent(cName: string, eName: string, data: string) {
              const owner = ref.get();
              if (owner.eventChannels.has(`${cName}_${eName}`)) {
                const eventData = owner.eventChannels.get(`${cName}_${eName}`);
                const cb = eventData.callback;
                cb(null, {
                  channelName: cName,
                  eventName: eName,
                  data: JSON.parse(data)
                });
              }
            }
          }
        );
        (channel as any).bind(event, binding);
        this.eventChannels.set(`${channelName}_${event}`, {
          binding: binding,
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
      if (!this.android.getChannel(channelName)) {
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
          this.channelsCallback.set(channelName, callback);
        } else {
          channel = this.android.subscribe(channelName);
        }
      }
    }
  }

  subscribePresence(channelName: string, callback?: Function): void {
    if (!this.android.getPresenceChannel(channelName)) {
      if (typeof callback === 'function') {
        (this.android as any).subscribePresence(
          channelName,
          new com.pusher.client.channel.PresenceChannelEventListener(<any>{
            onUsersInformationReceived(channelName, users) {
              callback(null, {
                channelName: channelName,
                users: users
              });
            },
            userSubscribed(channelName, user) {
              callback(null, {
                channelName: channelName,
                user: user
              });
            },
            userUnsubscribed(channelName, user) {
              callback(null, {
                channelName: channelName,
                user: user
              });
            },
            onAuthenticationFailure(message: string, e: string) {
              callback(message, null);
            }
          })
        );
        this.presenceChannelsCallback.set(channelName, callback);
      } else {
        this.android.subscribePresence(channelName);
      }
    }
  }

  subscribeToPrivateChannel(channelName: string, callback?: Function): void {
    if (!this.android.getPrivateChannel(channelName)) {
      if (typeof callback === 'function') {
        (this.android as any).subscribePrivate(
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
        this.privateChannelsCallback.set(channelName, callback);
      } else {
        this.android.subscribePrivate(channelName);
      }
    }
  }
  subscribeToPrivateChannelEvent(
    channelName: string,
    event: string,
    callback?: Function
  ): void {
    if (this.android.getPrivateChannel(channelName)) {
      const channel = this.android.getPrivateChannel(channelName);
      if (channel && !channel.isSubscribed()) {
        const ref = new WeakRef(this);
        const binding = new com.pusher.client.channel.SubscriptionEventListener(
          {
            onEvent(cName: string, eName: string, data: string) {
              const owner = ref.get();
              if (owner.eventChannels.has(`${cName}_${eName}`)) {
                const eventData = owner.eventChannels.get(`${cName}_${eName}`);
                const cb = eventData.callback;
                cb(null, {
                  channelName: cName,
                  eventName: eName,
                  data: JSON.parse(data)
                });
              }
            }
          }
        );
        (channel as any).bind(event, binding);

        this.privateEventChannels.set(`${channelName}_${event}`, {
          binding: binding,
          callback: callback
        });
      }
    } else {
      this.subscribeToPrivateChannel(channelName);
      this.subscribeToPrivateChannelEvent(channelName, event, callback);
    }
  }
  unsubscribeAll(): void {
    // TODO
  }
  unsubscribeEvent(channelName: string, event: string): void {
    if (this.eventChannels.has(`${channelName}_${event}`)) {
      const eventData = this.eventChannels.get(`${channelName}_${event}`);
      const channel = this.android.getChannel(channelName);
      channel.unbind(event, eventData.binding);
    }
  }
  unsubscribePrivateEvent(channelName: string, event: string): void {
    if (this.privateEventChannels.has(`${channelName}_${event}`)) {
      const eventData = this.privateEventChannels.get(
        `${channelName}_${event}`
      );
      const channel = this.android.getPrivateChannel(channelName);
      channel.unbind(event, eventData.binding);
    }
  }
  unsubscribe(channelName: string): void {
    this.android.unsubscribe(channelName);
    if (this.channelsCallback.has(channelName)) {
      this.channelsCallback.delete(channelName);
    }
  }
  unsubscribePrivate(channelName: string): void {
    this.android.unsubscribe(channelName);
    if (this.privateChannelsCallback.has(channelName)) {
      this.privateChannelsCallback.delete(channelName);
    }
  }
}

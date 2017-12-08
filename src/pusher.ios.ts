/// <reference path="./node_modules/tns-core-modules/tns-core-modules.d.ts" />
import { Common, Options, ConnectionStatus } from './pusher.common';
import { deserialize } from './helper';
export class TNSPusher extends Common {
  private _options;
  _connectionCallback;
  ios: Pusher;
  constructor(apiKey: string, options: Options = {}) {
    super();
    this.channels = new Map();
    this.presenceChannels = new Map();
    this.eventChannels = new Map();
    this.privateChannels = new Map();
    this.privateEventChannels = new Map();
    let ocAuthMethod;
    // if (options.authorizer) {
    //   ocAuthMethod = OCAuthMethod.alloc().initWithAuthEndpoint(
    //     options.authorizer
    //   );
    // }

    // this._options = PusherClientOptions.alloc().initWithOcAuthMethodAttemptToReturnJSONObjectAutoReconnectOcHostPortEncrypted(
    //   ocAuthMethod,
    //   true,
    //   Boolean(options.autoReconnect),
    //   options.cluster
    //     ? OCPusherHost.alloc().initWithCluster(options.cluster)
    //     : null,
    //   null,
    //   Boolean(options.encrypted)
    // );

    this.ios = Pusher.alloc().initWithKey(apiKey); // Pusher.alloc().initWithAppKeyOptions(apiKey, this._options);
    this.ios.delegate = TNSPusherDelegateImpl.initWithOwner(new WeakRef(this));
  }
  connect(callback?: Function): void {
    this._connectionCallback = callback;
    this.ios.connect();
  }
  disconnect(): void {
    this.ios.disconnect();
  }
  subscribeToChannelEvent(
    channelName: string,
    event: string,
    callback?: Function
  ): void {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName)['channel'];
      // TODO Check why channel.bindWithEventNameCallback is undefined
      if (channel && !channel.subscribed) {
        channel.bindWithEventNameCallback(event, data => {
          callback({
            channel: channelName,
            eventName: event,
            data: deserialize(data)
          });
        });
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
      const channel = this.ios.subscribeWithChannelName(channelName);
      this.channels.set(channelName, {
        channel: channel,
        callback: callback
      });
    }
  }
  subscribePresence(channelName: string, callback?: Function): void {
    if (!this.presenceChannels.has(channelName)) {
      let presenceChannel;
      if (typeof callback === 'function') {
        presenceChannel = this.ios.subscribeToPresenceChannelWithChannelNameOnMemberAddedOnMemberRemoved(
          channelName,
          added => {
            callback(null, {
              channel: channelName,
              user: added.userId
            });
          },
          removed => {
            callback(null, {
              channel: channelName,
              user: removed.userId
            });
          }
        );
      } else {
        presenceChannel = this.ios.subscribeToPresenceChannelWithChannelName(
          channelName
        );
      }
      this.presenceChannels.set(channelName, {
        channel: presenceChannel,
        callback: callback
      });
    }
  }

  subscribeToPrivateChannel(channelName: string, callback?: Function): void {
    channelName = `private-${channelName}`;
    if (!this.privateChannels.has(channelName)) {
      const privateChannel = this.ios.subscribeWithChannelName(channelName);
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
    channelName = `private-${channelName}`;
    if (this.privateChannels.has(channelName)) {
      const channel = this.privateChannels.get(channelName)['channel'];

      if (channel && !channel.subscribed) {
        channel.bindWithEventNameCallback(event, data => {
          callback({
            channel: channelName,
            eventName: event,
            data: deserialize(data)
          });
        });
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
    this.ios.unsubscribe(channelName);
  }
  unsubscribePrivate(channelName: string): void {
    channelName = `private-${channelName}`;
    this.ios.unsubscribe(channelName);
    this.privateChannels.delete(channelName);
  }
}

export class TNSPusherDelegateImpl extends NSObject implements PusherDelegate {
  public static ObjCProtocols = [PusherDelegate];
  private _owner: TNSPusher;
  public static initWithOwner(owner: WeakRef<any>): TNSPusherDelegateImpl {
    const delegate = new TNSPusherDelegateImpl();
    delegate._owner = owner.get();
    return delegate;
  }
  changedConnectionStateFromTo(
    old: ConnectionState,
    new_: ConnectionState
  ): void {
    const callback = this._owner._connectionCallback;
    if (typeof callback === 'function') {
      this._owner._connectionCallback(null, {
        current: this.getStatus(new_),
        previous: this.getStatus(old)
      });
    }
  }

  private getStatus(status) {
    switch (status) {
      case ConnectionState.Connecting:
        return ConnectionStatus.CONNECTING;
      case ConnectionState.Connected:
        return ConnectionStatus.CONNECTED;
      case ConnectionState.Disconnecting:
        return ConnectionStatus.DISCONNECTING;
      case ConnectionState.Disconnected:
        return ConnectionStatus.DISCONNECTED;
      default:
        return ConnectionStatus.RECONNECTING;
    }
  }

  failedToSubscribeToChannelWithNameResponseDataError(
    name: string,
    response: NSURLResponse,
    data: string,
    error: NSError
  ): void {
    if (this._owner.channels.has(name)) {
      const channelData = this._owner.channels.get(name);
      const callback = channelData.callback;
      if (callback) {
        callback(error.localizedDescription, null);
      }
    }
  }

  subscribedToChannelWithName(name: string): void {
    if (this._owner.channels.has(name)) {
      const channelData = this._owner.channels.get(name);
      const callback = channelData.callback;
      if (callback) {
        callback({ channelName: name });
      }
    }
  }
}

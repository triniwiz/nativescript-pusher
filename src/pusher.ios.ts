import { Common } from './pusher.common';
import { Options } from './interfaces';
import { ConnectionStatus } from './enums';
export * from './interfaces';
export * from './enums';
import { deserialize } from './helper';

declare class WeakRef<T> {
  constructor(target: any);
}

export class Pusher extends Common {
  _connectionCallback;
  ios: PTPusher;
  private _options;
  private _delegate: any;
  private _presenceDelegate: any;
  constructor(apiKey: string, options: Options = { encrypted: true }) {
    super();
    this.channelsCallback = new Map();
    this.presenceChannelsCallback = new Map();
    this.eventChannels = new Map();
    this.privateChannelsCallback = new Map();
    this.privateEventChannels = new Map();
    this._delegate = TNSPusherDelegateImpl.initWithOwner(new WeakRef(this));
    if (options.cluster) {
      this.ios = PTPusher.pusherWithKeyDelegateEncryptedCluster(
        apiKey,
        this._delegate,
        options.encrypted,
        options.cluster
      );
    } else if (!options.cluster && !options.encrypted) {
      this.ios = PTPusher.pusherWithKeyDelegateEncrypted(
        apiKey,
        this._delegate,
        options.encrypted
      );
    } else {
      this.ios = PTPusher.pusherWithKeyDelegate(
        apiKey,
        this._delegate
      );
    }
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
    callback: Function
  ): void {
    const channel = this.ios.channelNamed(channelName);
    if (channel) {
      const binding = channel.bindToEventNamedHandleWithBlock(
        event,
        ptEvent => {
          callback(null, {
            channelName: ptEvent.channel,
            eventName: ptEvent.name,
            data: deserialize(ptEvent.data)
          });
        }
      );
      this.eventChannels.set(`${channel}_${event}`, {
        binding: binding,
        callback: callback
      });
    } else {
      this.subscribeToChannel(channelName);
      this.subscribeToChannelEvent(channelName, event, callback);
    }
  }
  subscribeToChannel(channelName: string, callback?: Function): void {
    if (channelName && !this.ios.channelNamed(channelName)) {
      const channel = this.ios.subscribeToChannelNamed(channelName);
      this.channelsCallback.set(channelName, callback);
    }
  }
  subscribePresence(channelName: string, callback?: Function): void {
    let presenceChannel = this.ios.channelNamed(`presence-${channelName}`);
    if (presenceChannel) {
      if (typeof callback === 'function') {
        if (!this._presenceDelegate) {
          this._presenceDelegate = TNSPusherPresenceChannelDelegateImpl.initWithOwner(new WeakRef(this));
        }
        presenceChannel = this.ios.subscribeToPresenceChannelNamedDelegate(
          channelName,
          this._presenceDelegate
        );
      } else {
        presenceChannel = this.ios.subscribeToPresenceChannelNamed(channelName);
      }
      this.presenceChannelsCallback.set(channelName, callback);
    }
  }

  subscribeToPrivateChannel(channelName: string, callback?: Function): void {
    let privateChannel = this.ios.channelNamed(`private-${channelName}`);
    if (!privateChannel) {
      privateChannel = this.ios.subscribeToPrivateChannelNamed(channelName);
      if (callback) {
        this.privateChannelsCallback.set(channelName, callback);
      }
    }
  }
  subscribeToPrivateChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void {
    let privateChannel = this.ios.channelNamed(`private-${channelName}`);
    if (privateChannel) {
      if (privateChannel && privateChannel.subscribed) {
        const binding = privateChannel.bindToEventNamedHandleWithBlock(
          event,
          ptEvent => {
            callback(null, {
              channelName: ptEvent.channel,
              eventName: ptEvent.name,
              data: deserialize(ptEvent.data)
            });
          }
        );
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
    this.ios.unsubscribeAllChannels();
  }

  unsubscribeEvent(channelName: string, event: string): void {
    if (this.eventChannels.has(`${channelName}_${event}`)) {
      const eventData = this.eventChannels.get(`${channelName}_${event}`);
      const channel = this.ios.channelNamed(channelName);
      if (channel) {
        channel.removeBinding(eventData.binding);
        this.eventChannels.delete(`${channelName}_${event}`);
      }
    }
  }

  unsubscribePrivateEvent(channelName: string, event: string): void {
    if (this.privateEventChannels.has(`${channelName}_${event}`)) {
      const eventData = this.privateEventChannels.get(
        `${channelName}_${event}`
      );
      const channel = this.ios.channelNamed(`private-${channelName}`);
      if (channel) {
        channel.removeBinding(eventData.binding);
        this.privateEventChannels.delete(`${channelName}_${event}`);
      }
    }
  }
  unsubscribe(channelName: string): void {
    const channel = this.ios.channelNamed(channelName);
    if (channel) {
      channel.unsubscribe();
      if (this.channelsCallback.has(channelName)) {
        this.channelsCallback.delete(channelName);
      }
    }
  }
  unsubscribePrivate(channelName: string): void {
    const privateChannel = this.ios.channelNamed(`private-${channelName}`);
    if (privateChannel) {
      privateChannel.unsubscribe();
      if (this.privateChannelsCallback.has(channelName)) {
        this.privateChannelsCallback.delete(channelName);
      }
    }
  }
}

const TNSPusherDelegateImpl = (<any>NSObject).extend({
  _previous: ConnectionStatus.DISCONNECTED,
  pusherConnectionDidConnect: function(
    pusher: PTPusher,
    connection: PTPusherConnection
  ): void {
    const owner = this._owner.get();
    const callback = owner._connectionCallback;
    if (typeof callback === 'function') {
      owner._connectionCallback(null, {
        current: ConnectionStatus.CONNECTED,
        previous: this._previous
      });
      this._previous = ConnectionStatus.CONNECTED;
    }
  },

  pusherConnectionDidDisconnectWithErrorWillAttemptReconnect: function(
    pusher: PTPusher,
    connection: PTPusherConnection,
    error: NSError,
    willAttemptReconnect: boolean
  ): void {
    const owner = this._owner.get();
    const callback = owner._connectionCallback;
    if (typeof callback === 'function') {
      owner._connectionCallback(null, {
        current: ConnectionStatus.DISCONNECTED,
        previous: this._previous
      });
      this._previous = ConnectionStatus.DISCONNECTED;
    }
  },

  pusherConnectionFailedWithError: function(
    pusher: PTPusher,
    connection: PTPusherConnection,
    error: NSError
  ): void {
    const owner = this._owner.get();
    if (typeof owner._connectionCallback === 'function') {
      owner._connectionCallback(null, {
        current: ConnectionStatus.DISCONNECTED,
        previous: this._previous
      });
      this._previous = ConnectionStatus.DISCONNECTED;
    }
  },

  pusherDidFailToSubscribeToChannelWithError: function(
    pusher: PTPusher,
    channel: PTPusherChannel,
    error: NSError
  ): void {
    const owner = this._owner.get();
    if (owner.channelsCallback.has(channel.name)) {
      const callback = owner.channelsCallback.get(channel.name);
      if (callback) {
        callback(error.localizedDescription, null);
      }
    }
  },

  pusherDidSubscribeToChannel: function(
    pusher: PTPusher,
    channel: PTPusherChannel
  ): void {
    const owner = this._owner.get();
    if (owner.channelsCallback.has(channel.name)) {
      const callback = owner.channelsCallback.get(channel.name);
      if (callback) {
        callback(null, { channelName: channel.name });
      }
    }
  }
}, {
  protocols: [PTPusherDelegate]
});
TNSPusherDelegateImpl['initWithOwner'] = function (owner: WeakRef<Pusher>) {
  const handler = TNSPusherDelegateImpl.new();
  handler._owner = owner;
  return handler;
};

const TNSPusherPresenceChannelDelegateImpl = (<any>NSObject).extend({
  presenceChannelDidSubscribe: function(channel: PTPusherPresenceChannel): void {
    const owner = this._owner.get();
    if (owner.presenceChannelsCallback.has(channel.name)) {
      const callback = owner.presenceChannelsCallback.get(channel.name);
      if (callback) {
        callback(null, {
          channel: channel.name,
          users: [] // channel.members
        });
      }
    }
  },

  presenceChannelMemberAdded: function(
    channel: PTPusherPresenceChannel,
    member: PTPusherChannelMember
  ): void {
    const owner = this._owner.get();
    if (owner.presenceChannelsCallback.has(channel.name)) {
      const callback = owner.presenceChannelsCallback.get(channel.name);
      if (callback) {
        callback(null, { channelName: channel.name, user: member.userID });
      }
    }
  },

  presenceChannelMemberRemoved: function(
    channel: PTPusherPresenceChannel,
    member: PTPusherChannelMember
  ): void {
    const owner = this._owner.get();
    if (owner.presenceChannelsCallback.has(channel.name)) {
      const callback = owner.presenceChannelsCallback.get(channel.name);
      if (callback) {
        callback(null, { channelName: channel.name, user: member.userID });
      }
    }
  }
}, {
  protocols: [PTPusherPresenceChannelDelegate]
});
TNSPusherPresenceChannelDelegateImpl['initWithOwner'] = function (owner: WeakRef<Pusher>) {
  const handler = TNSPusherPresenceChannelDelegateImpl.new();
  handler._owner = owner;
  return handler;
};

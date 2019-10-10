import {
  InternalPusherEvents,
  TNSPusherBase,
  TNSPusherChannelBase,
  TNSPusherConnectionBase
} from './pusher.common';
import { Options } from './interfaces';
import { ConnectionStatus } from './enums';
import { deserialize } from './helper';

export * from './interfaces';
export * from './enums';

const connectionEvents = new Map<
  Function,
  { event: string; listener: any; channelName: string }
>();
const channelEvents = new Map<
  Function,
  { event: string; listener: any; channelName: string }
>();
let globalEvents = [];

export class TNSPusher extends TNSPusherBase {
  private _options;
  android: com.pusher.client.Pusher;

  constructor(apiKey: string, options?: Options) {
    super();
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

      if (options.authEndpoint) {
        const endpoint = new com.pusher.client.util.HttpAuthorizer(
          options.authEndpoint
        );
        this._options.setAuthorizer(endpoint);
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

  private static getConnectionStatus(status): ConnectionStatus {
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

  private _connection: TNSPusherConnection;

  public get connection() {
    if (!this._connection) {
      this._connection = new TNSPusherConnection(this.android);
    }
    return this._connection;
  }

  connect(): void {
    const ref = new WeakRef(this);
    this.android.connect(
      new com.pusher.client.connection.ConnectionEventListener({
        onConnectionStateChange(
          state: com.pusher.client.connection.ConnectionStateChange
        ) {
          const owner = ref.get();
          if (owner) {
            const current = TNSPusher.getConnectionStatus(
              state.getCurrentState()
            );
            const previous = TNSPusher.getConnectionStatus(
              state.getPreviousState()
            );
            owner.connection._state = current;
            const didConnect =
              (previous === ConnectionStatus.CONNECTING &&
                current === ConnectionStatus.CONNECTED) ||
              (previous === ConnectionStatus.RECONNECTING &&
                current === ConnectionStatus.CONNECTED);
            connectionEvents.forEach((ev, callback) => {
              if (ev.event === 'state_change') {
                callback({
                  previous,
                  current
                });
              }

              if (ev.event === 'connected' && didConnect) {
                callback();
              }
            });
          }
        },
        onError(error: string, code: string, exception: java.lang.Exception) {}
      }),
      [com.pusher.client.connection.ConnectionState.ALL]
    );
  }

  disconnect(): void {
    this.android.disconnect();
  }

  subscribe(channelName: string) {
    let subscription;
    if (channelName.startsWith('private-')) {
      if (this.android.getPrivateChannel(channelName)) {
        return new TNSPusherChannel(
          this.android,
          this.android.getPrivateChannel(channelName)
        );
      }
      subscription = this.android.subscribePrivate(
        channelName,
        new com.pusher.client.channel.PrivateChannelEventListener({
          onAuthenticationFailure(error: string, param1: java.lang.Exception) {
            console.log('onAuthenticationFailure', 'error', error);
            channelEvents.forEach((event, callback) => {
              if (event.channelName ===  channelName && event.event === 'pusher:subscription_error') {
                callback();
              }
            });
          },
          onSubscriptionSucceeded(channelName: string) {
            channelEvents.forEach((event, callback) => {
              if (event.channelName === channelName && event.event === 'pusher:subscription_succeeded') {
                callback();
              }
            });
          },
          onEvent(ev: com.pusher.client.channel.PusherEvent) {}
        }),
        []
      );
    } else if (channelName.startsWith('presence-')) {
      if (this.android.getPresenceChannel(channelName)) {
        return new TNSPusherChannel(
          this.android,
          this.android.getPresenceChannel(channelName)
        );
      }
      subscription = this.android.subscribePresence(
        channelName,
        {
          onUsersInformationReceived(
            param0: string,
            param1: java.util.Set<com.pusher.client.channel.User>
          ) {},
          userSubscribed(
            param0: string,
            param1: com.pusher.client.channel.User
          ) {},
          userUnsubscribed(
            param0: string,
            param1: com.pusher.client.channel.User
          ) {},
          onAuthenticationFailure(
            error: string,
            param1: java.lang.Exception
          ) {
            channelEvents.forEach((event, callback) => {
              if (event.channelName ===  channelName && event.event === 'pusher:subscription_error') {
                callback();
              }
            });
          },
          onSubscriptionSucceeded(channelName: string) {
            channelEvents.forEach((event, callback) => {
              if (event.channelName === channelName && event.event === 'pusher:subscription_succeeded') {
                callback();
              }
            });
          },
          onEvent(ev: com.pusher.client.channel.PusherEvent) {
          }
        },
        []
      );
    } else {
      if (this.android.getChannel(channelName)) {
        return new TNSPusherChannel(
          this.android,
          this.android.getChannel(channelName)
        );
      }
      subscription = this.android.subscribe(channelName, new com.pusher.client.channel.ChannelEventListener({
        onSubscriptionSucceeded(param0: string) {
          channelEvents.forEach((event, callback) => {
            if (event.channelName === channelName && event.event === 'pusher:subscription_succeeded') {
              callback();
            }
          });
        },
        onEvent(ev: com.pusher.client.channel.PusherEvent): void {

        }
      }),[]);
    }
    return new TNSPusherChannel(this.android, subscription);
  }

  unsubscribeAll(): void {
    // TODO
  }

  unsubscribe(channelName: string): void {
    this.android.unsubscribe(channelName);
  }

  bind(callback: Function) {
    globalEvents.push(callback);
    return this;
  }

  unbind(callback: Function): void {
    globalEvents = globalEvents.filter(item => {
      return item !== callback;
    });
  }
}

export class TNSPusherChannel extends TNSPusherChannelBase {
  channel:
    | com.pusher.client.channel.Channel
    | com.pusher.client.channel.PrivateChannel
    | com.pusher.client.channel.PresenceChannel;
  android: com.pusher.client.Pusher;

  constructor(instance: any, channel: any) {
    super();
    this.android = instance;
    this.channel = channel;
  }

  get name() {
    return this.channel.getName();
  }

  bind(event: string, callback: Function) {
    let listener;
    if (this.name.startsWith('private-')) {
      listener = new com.pusher.client.channel.PrivateChannelEventListener({
        onAuthenticationFailure(error: string, param1: java.lang.Exception) {},
        onSubscriptionSucceeded(param0: string) {},
        onEvent(ev: com.pusher.client.channel.PusherEvent) {
          callback({
            channelName: ev.getChannelName(),
            eventName: ev.getEventName(),
            data: JSON.parse(ev.getData()),
            userId: ev.getUserId()
          });
        }
      });
    } else if (this.name.startsWith('presence-')) {
      listener = new com.pusher.client.channel.PresenceChannelEventListener({
        onUsersInformationReceived(
          param0: string,
          param1: java.util.Set<com.pusher.client.channel.User>
        ) {},
        userSubscribed(
          param0: string,
          param1: com.pusher.client.channel.User
        ) {},
        userUnsubscribed(
          param0: string,
          param1: com.pusher.client.channel.User
        ) {},
        onAuthenticationFailure(param0: string, param1: java.lang.Exception) {},
        onSubscriptionSucceeded(param0: string) {},
        onEvent(ev: com.pusher.client.channel.PusherEvent) {
          callback({
            channelName: ev.getChannelName(),
            eventName: ev.getEventName(),
            data: JSON.parse(ev.getData()),
            userId: ev.getUserId()
          });
        }
      });
    } else {
      listener = new com.pusher.client.channel.ChannelEventListener({
        onSubscriptionSucceeded(param0: string) {},
        onEvent(ev: com.pusher.client.channel.PusherEvent): void {
          callback({
            channelName: ev.getChannelName(),
            eventName: ev.getEventName(),
            data: JSON.parse(ev.getData()),
            userId: ev.getUserId()
          });
        }
      });
    }

    this.channel.bind(event, listener);
    channelEvents.set(callback, { event, listener , channelName: this.name});
  }

  unbind(event: string, callback: Function) {
    const data = channelEvents.get(callback);
    if (data) {
      this.channel.unbind(event, data.listener);
      channelEvents.delete(callback);
    }
  }

  trigger(event: string, data: any) {
    if (
      this.name &&
      (this.name.startsWith('private-') || this.name.startsWith('presence-'))
    ) {
      let toSend = '';
      if (typeof data === 'object') {
        toSend = JSON.stringify(data);
      } else if (typeof data === 'string') {
        toSend = data;
      }
      if (!event.startsWith('client-')) {
        event = `client-${event}`;
      }
      (this.channel as any).trigger(event, toSend);
    }
  }
}

export class TNSPusherConnection extends TNSPusherConnectionBase {
  android: com.pusher.client.Pusher;
  _state: any;

  constructor(instance: any) {
    super();
    this.android = instance;
  }

  bind(event: string, callback: Function) {
    if (event === 'state_change' || event === 'connected') {
      connectionEvents.set(callback, { event, listener: null , channelName: null});
    } else {
      const listener = new com.pusher.client.connection.ConnectionEventListener(
        {
          onConnectionStateChange(
            param0: com.pusher.client.connection.ConnectionStateChange
          ) {},
          onError(error: string, code: string, exception: java.lang.Exception) {
            if (event === 'error') {
              callback({
                event,
                msg: error
              });
            }
          }
        }
      );
      this.android
        .getConnection()
        .bind(com.pusher.client.connection.ConnectionState.ALL, listener);
      connectionEvents.set(callback, { event, listener ,channelName: null});
    }
  }

  unbind(event: string, callback?: Function) {
    const data = connectionEvents.get(callback);
    if (data) {
      if (event === 'state_change' || event === 'connected') {
        connectionEvents.delete(callback);
        return;
      }
      this.android
        .getConnection()
        .unbind(
          com.pusher.client.connection.ConnectionState.ALL,
          data.listener
        );
      connectionEvents.delete(callback);
    }
  }

  get state() {
    return this._state;
  }
}

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

export class TNSPusher extends TNSPusherBase {
  ios: Pusher;
  private readonly _delegate: any;
  private _globalEvents: Map<Function, string>;

  constructor(apiKey: string, options?: Options) {
    super();
    this._globalEvents = new Map<Function, string>();
    this._delegate = PusherDelegateImpl.initWithOwner(new WeakRef(this));
    if (options) {
      let authEndpoint = OCAuthMethod.alloc().initWithType(4);
      if(options.authEndpoint){
        authEndpoint = OCAuthMethod.alloc().initWithAuthEndpoint(options.authEndpoint);
      }
      let host = OCPusherHost.alloc().init();
      if (options.cluster) {
        host = OCPusherHost.alloc().initWithCluster(options.cluster);
      }

      if (options.host) {
        host = OCPusherHost.alloc().initWithHost(options.host);
      }
      const opts = PusherClientOptions.alloc().initWithOcAuthMethodAutoReconnectOcHostPortEncryptedActivityTimeout(
        authEndpoint,
        !!options.autoReconnect,
        host,
        options.port || null,
        !!options.encrypted,
        options.activityTimeout || null
      );
      this.ios = Pusher.alloc().initWithAppKeyOptions(apiKey, opts);
    } else {
      this.ios = Pusher.alloc().initWithKey(apiKey);
    }

    this.ios.delegate = this._delegate;
  }

  connect(): void {
    this.ios.connect();
  }

  disconnect(): void {
    this.ios.disconnect();
  }

  private _connection: TNSPusherConnection;

  public get connection() {
    if (!this._connection) {
      this._connection = new TNSPusherConnection(this.ios);
    }
    return this._connection;
  }

  bind(callback: Function) {
    const id = this.ios.bindWithEventCallback(ev => {
      const channelName = reader.readProp(ev, 'channelName', interop.types.id);
      const eventName = reader.readProp(ev, 'eventName', interop.types.id);
      const data = reader.readProp(ev, 'data', interop.types.id);
      const userId = reader.readProp(ev, 'userId', interop.types.id);
      callback({
        channelName,
        data: JSON.parse(data),
        eventName,
        userId
      });
    });
    this._globalEvents.set(callback, id);
    return this;
  }

  unbind(callback: Function) {
    const id = this._globalEvents.get(callback);
    if (id) {
      this.ios.unbindWithCallbackId(id);
      this._globalEvents.delete(callback);
    }
  }

  subscribe(event: string) {
    const channel = this.ios.subscribeWithChannelNameOnMemberAddedOnMemberRemoved(
      event,
      p1 => {},
      p1 => {}
    );
    return new TNSPusherChannel(this.ios, channel);
  }

  unsubscribeAll(): void {
    this.ios.unsubscribeAll();
  }

  unsubscribe(channelName: string): void {
    this.ios.unsubscribe(channelName);
  }
}

export class TNSPusherChannel extends TNSPusherChannelBase {
  channel: PusherChannel;
  ios: Pusher;
  connection: any;
  private _channelEvents: Map<Function, string>;

  constructor(instance: any, channel: any) {
    super();
    this._channelEvents = new Map<Function, string>();
    this.ios = instance;
    this.channel = channel;
    this.channel.name;
  }

  get name() {
    return this.channel.name;
  }

  trigger(event: string, data: any) {
    if(this.name && (this.name.startsWith('private-') || this.name.startsWith('presence-') )){
      this.channel.triggerWithEventNameData('client-' + event, data);
    }
  }

  bind(event: string, callback: Function) {
    //pusher:connection_established
    const id = this.channel.bindWithEventNameEventCallback(event, ev => {
      const channelName = reader.readProp(ev, 'channelName', interop.types.id);
      const eventName = reader.readProp(ev, 'eventName', interop.types.id);
      const data = reader.readProp(ev, 'data', interop.types.id);
      const userId = reader.readProp(ev, 'userId', interop.types.id);
      callback({
        channelName,
        data: JSON.parse(data),
        eventName,
        userId
      });
    });
    this._channelEvents.set(callback, id);
  }

  unbind(event: string, callback: Function) {
    const id = this._channelEvents.get(callback);
    if (id) {
      this.ios.unbindWithCallbackId(id);
      /*this.ios.unbindWithEventNameCallbackId(event, id);*/
      this._channelEvents.delete(callback);
    }
  }
}

export class TNSPusherConnection extends TNSPusherConnectionBase {
  ios: Pusher;
  _state: any;
  readonly events: Map<Function, { event: string; id: string }>;

  constructor(instance: any) {
    super();
    this.ios = instance;
    this.events = new Map<Function, { event: string; id: string }>();
  }

  bind(event: string, callback: Function) {
    if (event === 'state_change' || event === 'connected') {
      const id = NSUUID.UUID().UUIDString;
      this.events.set(callback, { event, id });
    } else {
      const id = this.ios.bind(data => {
        if (data) {
          const nativeEvent = data.objectForKey('event');
          if (event === 'error' && nativeEvent === InternalPusherEvents.Error) {
            callback(deserialize(data));
            this.events.set(callback, { event, id: id });
          }
          if (event === 'ping' && nativeEvent === InternalPusherEvents.Ping) {
            callback('ping');
            this.events.set(callback, { event, id: id });
          }

          if (event === 'pong' && nativeEvent === InternalPusherEvents.Pong) {
            callback('pong');
            this.events.set(callback, { event, id: id });
          }
        }
      });
    }
  }

  unbind(event: string, callback?: Function) {
    const object = this.events.get(callback);
    if (object) {
      this.ios.unbindWithCallbackId(object.id);
      this.events.delete(callback);
    }
  }

  get state() {
    return this._state;
  }
}

@ObjCClass(PusherDelegate)
class PusherDelegateImpl extends NSObject implements PusherDelegate {
  _owner: WeakRef<TNSPusher>;
  public static initWithOwner(owner: WeakRef<TNSPusher>) {
    const delegate = PusherDelegateImpl.new() as PusherDelegateImpl;
    delegate._owner = owner;
    return delegate;
  }

  private static _getState(state: ConnectionState) {
    switch (state) {
      case ConnectionState.Connected:
        return ConnectionStatus.CONNECTED;
      case ConnectionState.Connecting:
        return ConnectionStatus.CONNECTING;
      case ConnectionState.Disconnecting:
        return ConnectionStatus.DISCONNECTING;
      case ConnectionState.Reconnecting:
        return ConnectionStatus.RECONNECTING;
      default:
        return ConnectionStatus.DISCONNECTED;
    }
  }

  changedConnectionStateFromTo(
    old: ConnectionState,
    new_: ConnectionState
  ): void {
    const owner = this._owner.get();
    if (owner) {
      const current = PusherDelegateImpl._getState(new_);
      const previous = PusherDelegateImpl._getState(old);
      owner.connection._state = current;
      const didConnect =
        (old === ConnectionState.Connecting &&
          new_ === ConnectionState.Connected) ||
        (old === ConnectionState.Reconnecting &&
          new_ === ConnectionState.Connected);
      owner.connection.events.forEach((data, callback) => {
        if (data.event === 'connected' && didConnect) {
          callback();
        }

        if (data.event === 'state_change') {
          callback({
            previous,
            current
          });
        }
      });
    }
  }

  debugLogWithMessage(message: string): void {}

  failedToSubscribeToChannelWithNameResponseDataError(
    name: string,
    response: NSURLResponse,
    data: string,
    error: NSError
  ): void {
    const owner = this._owner.get();
  }

  subscribedToChannelWithName(name: string): void {
    const owner = this._owner.get();

    /* if (name.startsWith('presence-')) {
             if (owner.presenceChannelsCallback.has(name)) {
                 const callback = owner.presenceChannelsCallback.get(name);
                 if (callback) {
                     callback(null, {
                         channel: name,
                         users: [] // channel.members
                     });
                 }
             }
         } else {
             if (owner.channelsCallback.has(name)) {
                 const callback = owner.channelsCallback.get(name);
                 if (callback) {
                     callback(null, {channelName: name});
                 }
             }
         }
         */
  }
}

class NativePropertyReader {
  private _invocationCache = new Map<string, NSInvocation>();

  private getInvocationObject(
    object: NSObject,
    selector: string
  ): NSInvocation {
    let invocation = this._invocationCache.get(selector);
    if (!invocation) {
      const sig = object.methodSignatureForSelector(selector);
      invocation = NSInvocation.invocationWithMethodSignature(sig);
      invocation.selector = selector;

      this._invocationCache[selector] = invocation;
    }

    return invocation;
  }

  public readProp<T>(object: NSObject, prop: string, type: interop.Type<T>): T {
    const invocation = this.getInvocationObject(object, prop);
    invocation.invokeWithTarget(object);

    const ret = new interop.Reference<T>(type, new interop.Pointer());
    invocation.getReturnValue(ret);

    return ret.value;
  }
}

const reader = new NativePropertyReader();

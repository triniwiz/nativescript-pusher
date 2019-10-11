import { InternalPusherEvents, TNSPusherBase, TNSPusherChannelBase, TNSPusherConnectionBase } from './pusher.common';
import { Options } from './interfaces';
import { ConnectionStatus } from './enums';

export * from './interfaces';
export * from './enums';

export class TNSPusher extends TNSPusherBase {
    ios: Pusher;
    private readonly _delegate: any;
    _globalEvents: Map<Function, string>;
    _channelEvents: Map<Function, { channelName: string, event: string, id: string }>;
    _connectionEvents: Map<Function, { event: string; id: string }>;

    constructor(apiKey: string, options?: Options) {
        super();
        this._globalEvents = new Map<Function, string>();
        this._channelEvents = new Map<Function, { channelName: string, event: string, id: string }>();
        this._connectionEvents = new Map<Function, { event: string; id: string }>();
        this._delegate = PusherDelegateImpl.initWithOwner(new WeakRef(this));
        if (options) {
            let authEndpoint = OCAuthMethod.alloc().initWithType(4);
            let authorizer;
            if (options.authEndpoint) {
                authEndpoint = OCAuthMethod.alloc().initWithAuthEndpoint(
                    options.authEndpoint
                );
            }
            if (options.authorizer) {

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
            this._connection = new TNSPusherConnection(this.ios, new WeakRef(this));
        }
        return this._connection;
    }

    bind(callback: Function) {
        const id = this.ios.bindWithEventCallback(ev => {
            if (!ev) {
                return;
            }
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
        let channel;
        if (this.ios && this.ios.connection && this.ios.connection.channels && this.ios.connection.channels.findWithName) {
            channel = this.ios.connection.channels.findWithName(event);
        }
        if (!channel) {
            channel = this.ios.subscribeWithChannelNameOnMemberAddedOnMemberRemoved(
                event,
                p1 => {
                },
                p1 => {
                }
            );
        }

        return new TNSPusherChannel(this.ios, channel, new WeakRef<TNSPusher>(this));
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
    ref: WeakRef<TNSPusher>;

    constructor(instance: any, channel: any, ref: WeakRef<TNSPusher>) {
        super();
        this.ios = instance;
        this.channel = channel;
        this.ref = ref;
    }

    get name() {
        return this.channel.name;
    }

    trigger(event: string, data: any) {
        if (
            this.name &&
            (this.name.startsWith('private-') || this.name.startsWith('presence-'))
        ) {
            if (!event.startsWith('client-')) {
                event = `client-${event}`;
            }
            this.channel.triggerWithEventNameData(event, data);
        }
    }

    bind(event: string, callback: Function) {
        const id = this.channel.bindWithEventNameEventCallback(event, ev => {
            if (!ev) {
                return;
            }
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
        const owner = this.ref && this.ref.get();
        if (owner) {
            owner._channelEvents.set(callback, {id, event, channelName: this.channel.name});
        }
    }

    unbind(event: string, callback: Function) {
        const owner = this.ref && this.ref.get();
        if (owner) {
            const data = owner._channelEvents.get(callback);
            if (data) {
                this.ios.unbindWithCallbackId(data.id);
                owner._channelEvents.delete(callback);
            }
        }
    }
}

export class TNSPusherConnection extends TNSPusherConnectionBase {
    ios: Pusher;
    _state: any;
    ref: WeakRef<TNSPusher>;

    constructor(instance: any, ref: WeakRef<TNSPusher>) {
        super();
        this.ios = instance;
        this.ref = ref;
    }

    bind(event: string, callback: Function) {
        const owner = this.ref.get();
        if (event === 'state_change' || event === 'connected') {
            const id = NSUUID.UUID().UUIDString;
            owner._connectionEvents.set(callback, {event, id});
        } else {
            const id = this.ios.bindWithEventCallback(ev => {
                if (ev) {
                    const channelName = reader.readProp(ev, 'channelName', interop.types.id);
                    const eventName = reader.readProp(ev, 'eventName', interop.types.id);
                    const data = reader.readProp(ev, 'data', interop.types.id);
                    const userId = reader.readProp(ev, 'userId', interop.types.id);
                    if (event === 'error' && eventName === InternalPusherEvents.Error) {
                        callback({
                            channelName,
                            data: JSON.parse(data)
                        });
                        owner._connectionEvents.set(callback, {event, id});
                    }
                    if (event === 'ping' && eventName === InternalPusherEvents.Ping) {
                        callback('ping');
                        owner._connectionEvents.set(callback, {event, id});
                    }

                    if (event === 'pong' && eventName === InternalPusherEvents.Pong) {
                        callback('pong');
                        owner._connectionEvents.set(callback, {event, id});
                    }
                }
            });
        }
    }

    unbind(event: string, callback?: Function) {
        const owner = this.ref.get();
        if (owner) {
            const data = owner._connectionEvents.get(callback);
            if (data) {
                this.ios.unbindWithCallbackId(data.id);
                owner._connectionEvents.delete(callback);
            }
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
            owner._connectionEvents.forEach((data, callback) => {
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

    debugLogWithMessage(message: string): void {
    }

    failedToSubscribeToChannelWithNameResponseDataError(
        name: string,
        response: NSURLResponse,
        data: string,
        error: NSError
    ): void {
        const owner = this._owner.get();
        if (owner) {
            owner._channelEvents.forEach((event, callback) => {
                if (event.channelName === name && event.event === 'pusher:subscription_error') {
                    callback({
                        channelName: name,
                        data: JSON.parse(data)
                    });
                }
            });
        }
    }

    subscribedToChannelWithName(name: string): void {
        const owner = this._owner.get();
        if (owner) {
            owner._channelEvents.forEach((event, callback) => {
                if (event.channelName === name && event.event === 'pusher:subscription_succeeded') {
                    callback();
                }
            });
        }
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

import { InternalPusherEvents, TNSPusherBase, TNSPusherChannelBase, TNSPusherConnectionBase } from './pusher.common';
import { Options } from './interfaces';
import { ConnectionStatus } from './enums';
import { deserialize } from './helper';

export * from './interfaces';
export * from './enums';

export class TNSPusher extends TNSPusherBase {
    private _options;
    android: com.pusher.client.Pusher;
    _globalEvents: Function[];
    _channels: string[];

    constructor(apiKey: string, options?: Options) {
        super();
        this._globalEvents = [];
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

    connect(): void {
        this.android.connect();

    }

    disconnect(): void {
        this.android.disconnect();
    }

    subscribe(
        channelName: string
    ) {
        return new TNSPusherChannel(this.android.subscribe(channelName));
    }

    unsubscribeAll(): void {
        // TODO
    }

    unsubscribe(channelName: string): void {
        this.android.unsubscribe(channelName);
    }

    bind(callback: Function) {
        this._globalEvents.push(callback);
        return this;
    }

    unbind(callback: Function): void {
        this._globalEvents = this._globalEvents.filter(item => {
            return item !== callback;
        })
    }
}

export class TNSPusherChannel extends TNSPusherChannelBase {
    android: com.pusher.client.channel.Channel;
    connection: any;
    private _channelEvents: Map<Function, string>;

    constructor(instance: any) {
        super();
        this._channelEvents = new Map<Function, string>();
        this.android = instance;
    }

    bind(event: string, callback: Function) {
        this.android.bind(event, new com.pusher.client.channel.SubscriptionEventListener({
            onEvent(event: com.pusher.client.channel.PusherEvent): void {
            }
        }));
    }

    unbind(event: string, callback: Function) {

    }

}

export class TNSPusherConnection extends TNSPusherConnectionBase {
    android: com.pusher.client.connection.Connection;
    _state: any;
    private events: Map<Function, string>;

    constructor(instance: any) {
        super();
        this.android = instance;
        this.events = new Map<Function, string>();
    }

    bind(event: string, callback: Function) {

    }

    unbind(event: string, callback?: Function) {
        const id = this.events.get(callback);
        if (id) {
            this.ios.unbindWithCallbackId(id);
            this.events.delete(callback);
        }
    }

    get state() {
        return this._state;
    }

}

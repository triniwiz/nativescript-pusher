import { ConnectionStatus } from './enums';

export interface ChannelEventMap {
    binding: any;
    callback: Function;
}

export interface Options {
    activityTimeout?: number;
    cluster?: string;
    encrypted?: boolean;
    host?: string;
    pongTimeout?: number;
    port?: number;
    autoReconnect?: boolean;
    authEndpoint?: string;
    authorizer?: (channel, options) => { authorize: (socketId, callback) => void };
    wsPort?: number;
    wssPort?: number;
    auth?: { headers?: Object, params?: Object }
}

export interface ConnectionStatusEvent {
    current: ConnectionStatus;
    previous: ConnectionStatus;
}

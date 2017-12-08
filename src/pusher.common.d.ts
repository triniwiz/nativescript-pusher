export declare abstract class Common {
    channels: Map<String, any>;
    privateChannels: Map<String, any>;
    presenceChannels: Map<String, any>;
    eventChannels: Map<String, any>;
    privateEventChannels: Map<String, any>;
    android: any;
    ios: any;
    abstract connect(callback?: Function): void;
    abstract disconnect(): void;
    abstract subscribeToChannelEvent(channelName: string, event: string, callback?: Function): void;
    abstract subscribeToChannel(channelName: string): void;
    abstract subscribePresence(channelName: string, callback?: Function): void;
    abstract subscribeToPrivateChannel(channelName: string, callback?: Function): void;
    abstract subscribeToPrivateChannelEvent(channelName: string, event: string, callback?: Function): void;
    abstract unsubscribe(channelName: string): void;
}
export interface Options {
    activityTimeout?: number;
    authorizer?: string;
    cluster?: string;
    encrypted?: boolean;
    host?: string;
    pongTimeout?: string;
    wsPort?: number;
    wssPort?: number;
    autoReconnect?: boolean;
}
export declare enum ConnectionStatus {
    CONNECTING = "connecting",
    CONNECTED = "connected",
    DISCONNECTING = "disconnecting",
    DISCONNECTED = "disconnected",
    RECONNECTING = "reconnecting",
}

export declare class Pusher {
    _pusher: any;
    _options: any;
    constructor(apiKey: string, options?: Options);
    connect(callback?: Function): void;
    disconnect(): void;
    getChannel(channelName: string): any;
    getConnection(): any;
    getPresenceChannel(channelName: string): any;
    getPrivateChannel(channelName: string): any;
    subscribe(channelName: string, callback?: Function): void;
    subscribePresence(channelName: string, callback?: Function): void;
    subscribePrivate(channelName: string, callback?: Function): void;
    unsubscribe(channelName: string): void;
}
export interface Options {
    activityTimeout: number;
    authorizer: any;
    cluster: string;
    encrypted: boolean;
    host: string;
    pongTimeout: string;
    wsPort: number;
    wssPort: number;
}

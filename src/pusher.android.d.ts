import { Common, Options } from './pusher.common';
export declare class TNSPusher extends Common {
    private _options;
    android: com.pusher.client.Pusher;
    constructor(apiKey: string, options?: Options);
    connect(callback?: Function): void;
    disconnect(): void;
    getChannel(channelName: string): com.pusher.client.channel.Channel;
    getConnection(): com.pusher.client.connection.Connection;
    getPresenceChannel(channelName: string): com.pusher.client.channel.PresenceChannel;
    getPrivateChannel(channelName: string): com.pusher.client.channel.PrivateChannel;
    subscribeToChannelEvent(channelName: string, event: string, callback?: Function): void;
    subscribeToChannel(channelName: string, callback?: Function): void;
    subscribePresence(channelName: string, callback?: Function): void;
    subscribeToPrivateChannel(channelName: string, callback?: Function): void;
    subscribeToPrivateChannelEvent(channelName: string, event: string, callback?: Function): void;
    unsubscribe(channelName: string): void;
    unsubscribePrivate(channelName: string): void;
}

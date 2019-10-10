import { ChannelEventMap } from './interfaces';
import { ConnectionStatus } from './enums';

export * from './interfaces';
export * from './enums';

export enum InternalPusherEvents {
    Error = 'pusher:error',
    Ping = 'pusher:ping',
    Pong = 'pusher:pong'
}

export abstract class TNSPusherBase {
    channelsCallback: Map<String, Function>;
    privateChannelsCallback: Map<String, Function>;
    presenceChannelsCallback: Map<String, Function>;
    eventChannels: Map<String, ChannelEventMap>;
    privateEventChannels: Map<String, ChannelEventMap>;
    /**
     * Native android pusher instance.
     */
    android: any;
    /**
     * Native ios pusher instance.
     */
    ios: any;

    abstract connect(callback?: Function): void;

    abstract disconnect(): void;

    abstract subscribe(
        channelName: string
    ): TNSPusherChannelBase;

    abstract unsubscribe(channelName: string): void;

    abstract bind(callback: Function): this;

    abstract unbind(callback: Function): void;

    abstract unsubscribeAll(): void;
}

export abstract class TNSPusherConnectionBase {
    android;
    ios;

    abstract bind(event: string, callback: Function);

    get state() {
        return ConnectionStatus.INITIALIZED
    }
}


export abstract class TNSPusherChannelBase {
    android;
    ios;

    abstract bind(event: string, callback: Function);

    abstract unbind(event: string, callback?: Function);

    abstract trigger(event: string, data: Object);
}

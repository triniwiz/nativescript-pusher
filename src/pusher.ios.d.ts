/// <reference path="node_modules/tns-core-modules/tns-core-modules.d.ts" />
import { Common, Options } from './pusher.common';
export declare class TNSPusher extends Common {
    private _options;
    _connectionCallback: any;
    ios: Pusher;
    constructor(apiKey: string, options?: Options);
    connect(callback?: Function): void;
    disconnect(): void;
    subscribeToChannelEvent(channelName: string, event: string, callback?: Function): void;
    subscribeToChannel(channelName: string, callback?: Function): void;
    subscribePresence(channelName: string, callback?: Function): void;
    subscribeToPrivateChannel(channelName: string, callback?: Function): void;
    subscribeToPrivateChannelEvent(channelName: string, event: string, callback?: Function): void;
    unsubscribe(channelName: string): void;
    unsubscribePrivate(channelName: string): void;
}
export declare class TNSPusherDelegateImpl extends NSObject implements PusherDelegate {
    static ObjCProtocols: {
        prototype: PusherDelegate;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<any>): TNSPusherDelegateImpl;
    changedConnectionStateFromTo(old: ConnectionState, new_: ConnectionState): void;
    private getStatus(status);
    failedToSubscribeToChannelWithNameResponseDataError(name: string, response: NSURLResponse, data: string, error: NSError): void;
    subscribedToChannelWithName(name: string): void;
}

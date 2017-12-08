/// <reference path="node_modules/tns-core-modules/tns-core-modules.d.ts" />
import { Common } from './pusher.common';
import { Options } from './interfaces';
export * from './interfaces';
export * from './enums';
export declare class Pusher extends Common {
    private _options;
    _connectionCallback: any;
    ios: PTPusher;
    constructor(apiKey: string, options?: Options);
    connect(callback?: Function): void;
    disconnect(): void;
    subscribeToChannelEvent(channelName: string, event: string, callback: Function): void;
    subscribeToChannel(channelName: string, callback?: Function): void;
    subscribePresence(channelName: string, callback?: Function): void;
    subscribeToPrivateChannel(channelName: string, callback?: Function): void;
    subscribeToPrivateChannelEvent(channelName: string, event: string, callback: Function): void;
    unsubscribeAll(): void;
    unsubscribeEvent(channelName: string, event: string): void;
    unsubscribePrivateEvent(channelName: string, event: string): void;
    unsubscribe(channelName: string): void;
    unsubscribePrivate(channelName: string): void;
}
export declare class TNSPusherDelegateImpl extends NSObject implements PTPusherDelegate {
    static ObjCProtocols: {
        prototype: PTPusherDelegate;
    }[];
    private _owner;
    private _previous;
    static initWithOwner(owner: WeakRef<Pusher>): TNSPusherDelegateImpl;
    pusherConnectionDidConnect(pusher: PTPusher, connection: PTPusherConnection): void;
    pusherConnectionDidDisconnectWithErrorWillAttemptReconnect(pusher: PTPusher, connection: PTPusherConnection, error: NSError, willAttemptReconnect: boolean): void;
    pusherConnectionFailedWithError(pusher: PTPusher, connection: PTPusherConnection, error: NSError): void;
    pusherDidFailToSubscribeToChannelWithError(pusher: PTPusher, channel: PTPusherChannel, error: NSError): void;
    pusherDidSubscribeToChannel(pusher: PTPusher, channel: PTPusherChannel): void;
}
export declare class TNSPusherPresenceChannelDelegateImpl extends NSObject implements PTPusherPresenceChannelDelegate {
    static ObjCProtocols: {
        prototype: PTPusherPresenceChannelDelegate;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<Pusher>): TNSPusherPresenceChannelDelegateImpl;
    presenceChannelDidSubscribe(channel: PTPusherPresenceChannel): void;
    presenceChannelMemberAdded(channel: PTPusherPresenceChannel, member: PTPusherChannelMember): void;
    presenceChannelMemberRemoved(channel: PTPusherPresenceChannel, member: PTPusherChannelMember): void;
}

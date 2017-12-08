import { Common } from './pusher.common';

export interface ChannelEventMap {
  binding: any;
  callback: Function;
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

export enum ConnectionStatus {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  DISCONNECTED = 'disconnected',
  RECONNECTING = 'reconnecting'
}
export interface ConnectionStatusEvent {
  current: ConnectionStatus;
  previous: ConnectionStatus;
}

export declare class Pusher extends Common {
  /**
   * Native ios (instance)[https://github.com/pusher/libPusher]
   */
  ios: any;
  /**
   * Native android (instance)[https://github.com/pusher/pusher-websocket-java]
   */
  android: any;
  constructor(apiKey: string, options?: Options);
  connect(callback?: Function): void;
  disconnect(): void;
  subscribeToChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void;
  subscribeToChannel(channelName: string, callback?: Function): void;
  subscribePresence(channelName: string, callback?: Function): void;
  subscribeToPrivateChannel(channelName: string, callback?: Function): void;
  subscribeToPrivateChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void;
  unsubscribe(channelName: string): void;
  unsubscribePrivate(channelName: string): void;
  unsubscribeAll(): void;
  unsubscribeEvent(channelName: string, event: string): void;
  unsubscribePrivateEvent(channelName: string, event: string): void;
}

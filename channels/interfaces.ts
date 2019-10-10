import { ConnectionStatus } from './enums';

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
  pongTimeout?: number;
  port?: number;
  autoReconnect?: boolean;
  authEndpoint?: string;
  wsPort?: number;
  wssPort?: number;
}

export interface ConnectionStatusEvent {
  current: ConnectionStatus;
  previous: ConnectionStatus;
}

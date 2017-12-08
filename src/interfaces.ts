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
  pongTimeout?: string;
  wsPort?: number;
  wssPort?: number;
  autoReconnect?: boolean;
}

export interface ConnectionStatusEvent {
  current: ConnectionStatus;
  previous: ConnectionStatus;
}

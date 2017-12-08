import { ChannelEventMap } from './interfaces';
export * from './interfaces';
export * from './enums';
export abstract class Common {
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
  abstract subscribeToChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void;
  abstract subscribeToChannel(channelName: string): void;
  abstract subscribePresence(channelName: string, callback?: Function): void;
  abstract subscribeToPrivateChannel(
    channelName: string,
    callback: Function
  ): void;
  abstract subscribeToPrivateChannelEvent(
    channelName: string,
    event: string,
    callback: Function
  ): void;
  abstract unsubscribe(channelName: string): void;
  abstract unsubscribePrivate(channelName: string): void;
  abstract unsubscribeAll(): void;
  abstract unsubscribeEvent(channelName: string, event: string): void;
  abstract unsubscribePrivateEvent(channelName: string, event: string): void;
}

# NativeScript Pusher

[![npm](https://img.shields.io/npm/v/nativescript-pusher.svg)](https://www.npmjs.com/package/nativescript-pusher)
[![npm](https://img.shields.io/npm/dt/nativescript-pusher.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-pusher)
[![Build Status](https://travis-ci.org//triniwiz/nativescript-pusher.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-pusher)

## Installation

```bash
tns plugin add nativescript-pusher
```

## Usage

```ts
const pusher = new Pusher(apiKey,options?);

pusher.subscribeToChannelEvent('activities','running',(error,data)=>{});

pusher.connect();

```

Api key follow ➡
[link](https://pusher.com/signup) to get
your api key

## Api

| Method             | Default | Type    | Description                                                 |
| ------------------ | ------- | ------- | ----------------------------------------------------------- |
| connect(callback?:Function)             |         | void    | Connects to Pusher. |
| disconnect()             |         | void    | Disconnect from Pusher.             |
| subscribeToChannel(channelName: string, callback?: Function) |         | void    | Subscribes to a public Channel with optional callback|
| subscribeToChannelEvent(channelName: string,event: string,callback: Function)           |         | void    | Subscribes to a public channel event.|
| subscribePresence(channelName: string, callback?: Function)        |   | void | Subscribes to a PresenceChannel which requires authentication. |
| subscribeToPrivateChannel(channelName: string, callback?: Function) |         | void    | Subscribes to a PrivateChannel which requires authentication. |
| subscribeToPrivateChannelEvent(channelName: string,event: string,callback: Function) |         | void    | Subscribes to a private channel event. |
| unsubscribe(channelName: string) |         | void    | Unsubscribes from a public channel using via the name of the channel. |
| unsubscribePrivate(channelName: string) |         | void    | Unsubscribes from a private channel using via the name of the channel. |
| unsubscribeAll() |         | void    | Unsubscribes from all channels. |
| unsubscribeEvent(channelName: string, event: string) |         | void    | Unsubscribes a previously subscribed event on a public channel. |
| unsubscribePrivateEvent(channelName: string, event: string) |         | void    | Unsubscribes a previously subscribed event on a private channel. |
## Example Image

| IOS                                     | Android                                     |
| --------------------------------------- | ------------------------------------------- |
| ![IOS](screenshots/pusher_ios.gif?raw=true) | ![Android](screenshots/pusher_android.gif?raw=true) |

# TODO

* [ ] Push Notifications

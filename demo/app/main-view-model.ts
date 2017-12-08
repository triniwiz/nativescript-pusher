import { Observable } from 'tns-core-modules/data/observable';
import { Pusher } from 'nativescript-pusher';

export class HelloWorldModel extends Observable {
  pusher: Pusher;
  constructor() {
    super();
    this.set('connectionStatus', '');
    this.set('channelName', '');
    this.set('eventName', '');
    this.pusher = new Pusher('08e36d57b01061a58520');
  }
}

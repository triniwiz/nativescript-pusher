import { Observable } from 'tns-core-modules/data/observable';
import { TNSPusher } from 'nativescript-pusher';

export class HelloWorldModel extends Observable {
  pusher: TNSPusher;
  constructor() {
    super();
    this.pusher = new TNSPusher('08e36d57b01061a58520');
  }
}

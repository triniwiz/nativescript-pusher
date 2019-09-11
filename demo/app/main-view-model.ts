import { Observable } from 'tns-core-modules/data/observable';
import { TNSPusher } from '@nativescript-pusher/channels';

export class HelloWorldModel extends Observable {
    pusher: TNSPusher;

    constructor() {
        super();
        this.set('connectionStatus', '');
        this.set('channelName', '');
        this.set('eventName', '');
        this.pusher = new TNSPusher('08e36d57b01061a58520');
    }
}

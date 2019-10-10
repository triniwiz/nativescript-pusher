import { Observable } from 'tns-core-modules/data/observable';
import { TNSPusher } from '@nativescript-pusher/channels';
import { isIOS } from 'tns-core-modules/platform';
export class HelloWorldModel extends Observable {
    pusher: TNSPusher;

    constructor() {
        super();
        const host = isIOS ? 'localhost': '10.0.2.2'
        this.set('connectionStatus', '');
        this.set('channelName', '');
        this.set('eventName', '');
        this.pusher = new TNSPusher('08e36d57b01061a58520', {
            authEndpoint: `http://${host}:5000/pusher/auth`
        });
    }
}

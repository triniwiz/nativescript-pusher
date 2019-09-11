import * as utils from 'tns-core-modules/utils/utils';
import * as app from 'tns-core-modules/application';

const receiver = require('./receiver');
if (receiver) {
    receiver.initNotificationService();
}
declare var com;
let messageHolder;
app.android.on('activityNewIntent', args => {
    const intent = args.intent as android.content.Intent;
    if (intent) {
        const extras = intent.getExtras();
        let object = {};
        if (extras) {
            const iterator = extras.keySet().iterator();
            while (iterator.hasNext()) {
                const key = iterator.next();
                switch (key) {
                    case 'google.sent_time':
                        object[key] = extras.getLong(key);
                        break;
                    case 'google.ttl':
                        object[key] = extras.getInt(key);
                        break;
                    default:
                        object[key] = extras.get(key);
                        break;
                }
            }
        }
        const pusher = extras ? extras.get('pusher') : null;
        if (pusher) {
            let pusherVal;
            try {
                pusherVal = JSON.parse(extras.get('pusher'))
            } catch (e) {
                pusherVal = pusher;
            }
            const message = {
                from: extras.get('from'),
                title: extras.get('title'),
                body: extras.get('body'),
                pusher: pusherVal,
                ...object
            };
            if (TNSPusherBeams._messageCallback) {
                TNSPusherBeams._messageCallback(message);
            } else {
                messageHolder = message;
            }
        }

    }
});

app.android.on('activityResumed', args => {
    if (TNSPusherBeams._messageCallback && messageHolder) {
        TNSPusherBeams._messageCallback(messageHolder);
        messageHolder = null;
    }
});


export class TNSPusherBeams {
    static _messageCallback: any;
    static _tokenCallback: any;
    static _interestsCallback: any;

    public static start(instanceId: string) {
        com.pusher.pushnotifications.PushNotifications.start(
            utils.ad.getApplicationContext(),
            instanceId
        );
    }

    public static addDeviceInterest(interest: string) {
        com.pusher.pushnotifications.PushNotifications.addDeviceInterest(interest);
    }

    public static addOnInterestsChangeCallback(callback: (interests: string[]) => void) {
        this._interestsCallback = callback;
        if (callback) {
            com.pusher.pushnotifications.PushNotifications.setOnDeviceInterestsChangedListener(new com.pusher.pushnotifications.SubscriptionsChangedListener({
                onSubscriptionsChanged(interests: java.util.Set<string>): void {
                    const iterator = interests.iterator();
                    const items = [];
                    while (iterator.hasNext()) {
                        items.push(iterator.next());
                    }
                    if (TNSPusherBeams._interestsCallback) {
                        TNSPusherBeams._interestsCallback(items);
                    }
                }
            }));
        } else {
            com.pusher.pushnotifications.PushNotifications.setOnDeviceInterestsChangedListener(null);
        }
    }

    public static addOnMessageReceivedCallback(
        callback: (message: any) => void
    ) {
        this._messageCallback = callback;
        /* com.pusher.pushnotifications.PushNotifications.setOnMessageReceivedListenerForVisibleActivity(app.android.startActivity, new com.pusher.pushnotifications.PushNotificationReceivedListener({
             onMessageReceived(remoteMessage) {
                 const message = {
                     from: remoteMessage.getFrom(),
                     data: {}
                 };

                 const notification = remoteMessage.getNotification();
                 if (notification) {
                     message['title'] = notification.getTitle();
                     message['body'] = notification.getBody();
                 }
                 const data = remoteMessage.getData() as java.util.Map<string, string>;
                 const keys = data.keySet().iterator();
                 while (keys.hasNext()) {
                     const key = keys.next();
                     try {
                         message.data[key] = JSON.parse(data.get(key));
                     } catch (e) {
                         message.data[key] = data.get(key);
                     }

                 }
                 callback(message);
             }
         }))*/
    }

    public static addOnPushTokenReceivedCallback(callback: (token: any) => void) {
        this._tokenCallback = callback;
    }

    public static getDeviceInterests() {
        const set = com.pusher.pushnotifications.PushNotifications.getDeviceInterests();
        const items = [];
        if (set) {
            const iterator = set.iterator();
            while (iterator.hasNext()) {
                items.push(iterator.next());
            }
        }
        return items;
    }

    public static removeDeviceInterest(interest: string) {
        com.pusher.pushnotifications.PushNotifications.removeDeviceInterest(interest);
    }

    public static clearDeviceInterests() {
        com.pusher.pushnotifications.PushNotifications.clearDeviceInterests();
    }

    public static registerForPushNotifications() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    public static unregisterForPushNotifications() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    public static clearAllState() {
        com.pusher.pushnotifications.PushNotifications.clearAllState();
    }

}

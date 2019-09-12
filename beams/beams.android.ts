import * as utils from 'tns-core-modules/utils/utils';
import * as app from 'tns-core-modules/application';

declare var com;
let messageHolder;
app.android.on('activityNewIntent', args => {
    const intent = args.intent as android.content.Intent;
    if (intent) {
        const extras = intent.getExtras();
        let object = {};
        let fcm = {};
        if (extras) {
            const iterator = extras.keySet().iterator();
            while (iterator.hasNext()) {
                const key = iterator.next() as string;
                if (key.startsWith('google.')) {
                    const new_key = key.replace('google.', '');
                    if (key === 'google.sent_time') {
                        fcm[new_key] = extras.getLong(key);
                    } else if (key === 'google.ttl') {
                        fcm[new_key] = extras.getInt(key);
                    } else {
                        fcm[new_key] = extras.get(key);
                    }
                } else {
                    object[key] = extras.get(key);
                }
            }
            object['fcm'] = fcm;
        }
        const pusher = extras ? extras.get('pusher') : null;
        if (pusher) {
            let pusherVal;
            try {
                pusherVal = JSON.parse(extras.get('pusher'));
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
    static _interestsCallback: any;
    static _messageCallback: any;

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
        com.github.triniwiz.pusher.BeamsPlugin.setOnMessageListener(new com.github.triniwiz.pusher.BeamsPlugin.Listener({
            onSuccess(data) {
                let message;
                try {
                    message = JSON.parse(data);
                } catch (e) {
                    message = data;
                }
                callback(message);
            }
        }));
    }

    public static addOnPushTokenReceivedCallback(callback: (token: any) => void) {
        com.github.triniwiz.pusher.BeamsPlugin.setOnTokenListener(new com.github.triniwiz.pusher.BeamsPlugin.Listener({
            onSuccess(data) {
                callback(data);
            }
        }));

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

import { isAndroid } from 'tns-core-modules/platform';
import { TNSPusherBeams } from './beams';

export function initNotificationService() {
    if (isAndroid) {
        @JavaProxy('com.github.triniwiz.pusher.NotificationsMessagingService')
        class NotificationsMessagingService extends com.pusher.pushnotifications.fcm
            .MessagingService {
            constructor() {
                super();
                return global.__native(this);
            }

            onMessageReceived(remoteMessage) {
                const message = {
                    from: remoteMessage.getFrom()
                };

                const notification = remoteMessage.getNotification();
                if (notification) {
                    message['title'] = notification.getTitle();
                    message['body'] = notification.getBody();
                }
                let delivered_priority = 'unknown';
                const priority = remoteMessage.getPriority();
                switch (priority) {
                    case 1:
                        delivered_priority = 'high';
                        break;
                    case 2:
                        delivered_priority = 'normal';
                        break;
                    default:
                        delivered_priority = 'unknown';
                }

                let original_priority = 'unknown';
                const o_priority = remoteMessage.getOriginalPriority();
                switch (o_priority) {
                    case 1:
                        original_priority = 'high';
                        break;
                    case 2:
                        original_priority = 'normal';
                        break;
                    default:
                        original_priority = 'unknown';
                }

                message['collapse_key'] = remoteMessage.getCollapseKey();
                message['google.delivered_priority'] = delivered_priority;
                message['google.original_priority'] = original_priority;
                message['google.message_id'] = remoteMessage.getMessageId();
                message['google.sent_time'] = remoteMessage.getSentTime();
                message['google.ttl'] = remoteMessage.getTtl();

                const data = remoteMessage.getData() as java.util.Map<string, string>;
                const keys = data.keySet().iterator();
                while (keys.hasNext()) {
                    const key = keys.next();
                    if (key === 'pusher') {
                        try {
                            message['pusher'] = JSON.parse(data.get(key));
                        } catch (e) {
                            message['pusher'] = data.get(key);
                        }
                    } else {
                        try {
                            message[key] = JSON.parse(data.get(key));
                        } catch (e) {
                            message[key] = data.get(key);
                        }
                    }

                }
                const callback = (TNSPusherBeams as any)._messageCallback;
                if (callback) {
                    callback(message);
                }
            }

            onNewToken(token: string): void {
                const callback = (TNSPusherBeams as any)._tokenCallback;
                if (callback) {
                    callback(token);
                }
            }
        }
    }
}

import * as application from 'tns-core-modules/application';
import * as types from 'tns-core-modules/utils/types';

declare var PushNotifications;
application.on(application.resumeEvent, args => {
    setTimeout(() => {
        if (TNSPusherBeams._messageCallback && TNSPusherBeams._cachedMessage) {
            TNSPusherBeams._messageCallback(TNSPusherBeams._cachedMessage);
            TNSPusherBeams._cachedMessage = undefined;
        }
    });
});

@ObjCClass(InterestsChangedDelegate)
class InterestsChangedDelegateImpl extends NSObject implements InterestsChangedDelegate {
    interestsSetOnDeviceDidChangeWithInterests(interests: NSArray<string> | string[]): void {
        if (TNSPusherBeams._interestsCallback) {
            let items = [];
            if (interests instanceof NSArray) {
                items = deserialize(interests);
            } else {
                items = interests;
            }
            TNSPusherBeams._interestsCallback(items);
        }
    }
}

export class TNSPusherBeams {
    static _interestsCallback: any;
    static _messageCallback: any;
    static _tokenCallback: any;
    static _cachedMessage: any;
    static _registerResolveCallback: any;
    static _registerRejectCallback: any;
    private static delegate = InterestsChangedDelegateImpl.new();

    private static getMessage(notification) {
        const message = deserialize(notification) || undefined;
        const aps = notification.objectForKey('aps');
        if (aps !== null && message) {
            const alert = aps.objectForKey('alert');
            if (alert !== null && alert.objectForKey) {
                message.title = alert.objectForKey('title');
                message.body = alert.objectForKey('body');
            }
        }
        if (message) {
            if (message.data) {
                Object.keys(message.data).forEach(key => {
                    message[key] = message.data[key];
                });
            }
            if (message.aps && message.aps.data) {
                Object.keys(message.aps.data).forEach(key => {
                    message[key] = message.aps.data[key];
                });
            }
            delete message.aps;
            delete message.data;
        }
        return message;
    }

    public static registerForPushNotifications() {
        return new Promise((resolve, reject) => {
            this._registerResolveCallback = resolve;
            this._registerRejectCallback = reject;
            const doRegistration = () => {
                const opts = UNAuthorizationOptions.Alert | UNAuthorizationOptions.Sound | UNAuthorizationOptions.Badge;
                UNUserNotificationCenter.currentNotificationCenter().requestAuthorizationWithOptionsCompletionHandler(opts, (granted, error) => {
                    console.log('granted', granted, 'error', error, UIApplication.sharedApplication.registeredForRemoteNotifications);
                    if (granted) {
                        UIApplication.sharedApplication.registerForRemoteNotifications();
                    } else if (error) {
                        reject(error.localizedDescription);
                        this._registerRejectCallback = undefined;
                        this._registerResolveCallback = undefined;
                    }
                });
            };
            if (UIApplication.sharedApplication) {
                doRegistration();
            } else {
                application.on(application.launchEvent, args => {
                    doRegistration();
                });
            }
        });
    }

    public static unregisterForPushNotifications() {
        return new Promise((resolve, reject) => {
            try {
                UIApplication.sharedApplication.unregisterForRemoteNotifications();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    public static start(instanceId: string) {
        if (application.ios.delegate === undefined) {
            @ObjCClass(UIApplicationDelegate)
            class UIApplicationDelegateImpl extends UIResponder
                implements UIApplicationDelegate {
            }

            application.ios.delegate = UIApplicationDelegateImpl;
        }
        application.ios.delegate.prototype.applicationDidFinishLaunchingWithOptions = (application, launchOptions: NSDictionary<any, any>) => {
            PushNotifications.shared.startWithInstanceId(instanceId);
            const notification = launchOptions ? launchOptions.objectForKey(UIApplicationLaunchOptionsRemoteNotificationKey) : null;
            if (notification) {
                const message = this.getMessage(notification);
                if (this._messageCallback) {
                    this._messageCallback(message);
                } else {
                    this._cachedMessage = message;
                }
            }
            return true;
        };

        application.ios.delegate.prototype.applicationDidRegisterForRemoteNotificationsWithDeviceToken = (application: UIApplication, deviceToken: NSData) => {
            if (application.currentUserNotificationSettings.types > 0) {
                if (this._registerResolveCallback) {
                    this._registerResolveCallback();
                    this._registerResolveCallback = undefined;
                    this._registerRejectCallback = undefined;
                }
            } else {
                if (this._registerRejectCallback) {
                    this._registerRejectCallback();
                    this._registerRejectCallback = undefined;
                    this._registerResolveCallback = undefined;
                }
            }
            console.log('deviceToken', deviceToken);
            PushNotifications.shared.registerDeviceToken(deviceToken);
        };

        application.ios.delegate.prototype.applicationDidReceiveRemoteNotificationFetchCompletionHandler = (application: UIApplication, userInfo: NSDictionary<any, any>, completionHandler: (p1: UIBackgroundFetchResult) => void) => {
            const message = this.getMessage(userInfo);
            const type = PushNotifications.shared.handleNotificationWithUserInfo(userInfo);
            /*if (type === RemoteNotificationType.ShouldIgnore) { ?? TODO ??
                completionHandler(UIBackgroundFetchResult.NoData);
                return;
            }*/
            completionHandler(UIBackgroundFetchResult.NewData);

            if (this._messageCallback && message) {
                this._messageCallback(message);
            }

        };

        application.ios.delegate.prototype.applicationDidFailToRegisterForRemoteNotificationsWithError = (application, error: NSError) => {
            if (error) {
                if (error.localizedDescription.indexOf('not supported in the simulator') > -1) {
                    if (this._registerResolveCallback) {
                        this._registerResolveCallback();
                    } else {
                        if (this._registerRejectCallback) {
                            this._registerRejectCallback(error.localizedDescription);
                        }
                    }
                } else {
                    if (this._registerRejectCallback) {
                        this._registerRejectCallback(error.localizedDescription);
                    }
                }
            }
        };

        if (!PushNotifications.shared.delegate) {
            PushNotifications.shared.delegate = this.delegate;
        }
    }

    public static addDeviceInterest(interest: string) {
        const error = new interop.Reference();
        PushNotifications.shared.addDeviceInterestWithInterestError(interest, error);
    }

    public static addOnInterestsChangeCallback(callback: (interests: string[]) => void) {
        this._interestsCallback = callback;
    }

    public static addOnMessageReceivedCallback(
        callback: (message: any) => void
    ) {
        this._messageCallback = callback;
        if (this._cachedMessage) {
            callback(this._cachedMessage);
            this._cachedMessage = undefined;
        }
    }

    public static addOnPushTokenReceivedCallback(callback: (token: any) => void) {
        this._tokenCallback = callback;
    }

    public static getDeviceInterests() {
        return deserialize(PushNotifications.shared.getDeviceInterests());
    }

    public static removeDeviceInterest(interest: string) {
        const error = new interop.Reference();
        PushNotifications.shared.removeDeviceInterestWithInterestError(interest, error);
    }

    public static clearDeviceInterests() {
        const error = new interop.Reference();
        PushNotifications.shared.clearDeviceInterestsAndReturnError(error);
    }

    public static clearAllState() {
        PushNotifications.shared.clearAllStateWithCompletion(null);
    }
}

// TODO allow always show notifications
/*
@ObjCClass(UNUserNotificationCenterDelegate)
class UNUserNotificationCenterDelegateImpl extends NSObject implements UNUserNotificationCenterDelegate {
    userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler(center: UNUserNotificationCenter, response: UNNotificationResponse, completionHandler: () => void) {
    }

    userNotificationCenterWillPresentNotificationWithCompletionHandler(center: UNUserNotificationCenter, notification: UNNotification, completionHandler: (p1: UNNotificationPresentationOptions) => void): void {
    }
}
*/


function deserialize(nativeData) {
    if (types.isNullOrUndefined(nativeData)) {
        // some native values will already be js null values
        // calling types.getClass below on null/undefined will cause crash
        return null;
    } else {
        switch (types.getClass(nativeData)) {
            case 'NSNull':
                return null;
            case 'NSMutableDictionary':
            case 'NSDictionary':
                let obj = {};
                const length = nativeData.count;
                const keysArray = nativeData.allKeys as NSArray<any>;
                for (let i = 0; i < length; i++) {
                    const nativeKey = keysArray.objectAtIndex(i);
                    obj[nativeKey] = deserialize(nativeData.objectForKey(nativeKey));
                }
                return obj;
            case 'NSMutableArray':
            case 'NSArray':
                let array = [];
                const len = nativeData.count;
                for (let i = 0; i < len; i++) {
                    array[i] = deserialize(nativeData.objectAtIndex(i));
                }
                return array;
            default:
                return nativeData;
        }
    }
}

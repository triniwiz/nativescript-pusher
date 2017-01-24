import {Observable} from "data/observable";
export class TNSPusher {
    private _pusher: Pusher;
    private _options: PusherClientOptions;
    private events: Observable;

    constructor(apiKey: string, options?: Options) {
        this.events = new Observable();
        const authMethod = OCAuthMethod.alloc().initWithAuthEndpoint(options.host);
        const host = OCPusherHost.alloc().initWithCluster(options.cluster);
        if (options) {
            this._options = PusherClientOptions.alloc().initWithOcAuthMethodAttemptToReturnJSONObjectAutoReconnectOcHostPortEncrypted(
                authMethod,
                true,
                true,
                host,
                null,
                true);
            this._pusher = Pusher.alloc().initWithAppKeyOptions(apiKey, this._options);
            this._pusher.delegate = PusherDelegateImpl.initWithEvents(this.events);
            // if (options.activityTimeout) {
            //     this._options.
            // }
            // if (options.authorizer) {
            //     const _authorizer = com.pusher.client.util.HttpAuthorizer(options.authorizer);
            //     this._options.setAuthorizer(_authorizer);
            // }

            // if (options.encrypted) {
            //     this._options.setEncrypted(options.encrypted);
            // }
            // if (options.host) {
            //     this._options.setHost(options.host);
            // }
            // if (options.pongTimeout) {
            //     this._options.setPongTimeout(options.pongTimeout);
            // }
            // if (options.wsPort) {
            //     this._options.setWsPort(options.wsPort);
            // }
            // if (options.wssPort) {
            //     this._options.setWssPort(options.wssPort);
            // }
            // this._pusher = new com.pusher.client.Pusher(apiKey, this._options);
        } else {
            // this._pusher = new com.pusher.client.Pusher(apiKey);
        }
    }

    connect() {
        this._pusher.connect();
    }

    disconnect() {
        this._pusher.disconnect();
    }

    // getChannel(channelName: string) {
    //     //return this._pusher.connection.userDataFetcher().initWithUserIdUserInfo
    // }

    getConnection() {
        return this._pusher.connection;
    }

    // getPresenceChannel(channelName: string) {
    //     return this._pusher.getPresenceChannel();
    // }
    //
    // getPrivateChannel(channelName: string) {
    //     return this._pusher.getPrivateChannel(channelName);
    // }
    //
    subscribe(channelName: string, callback?: Function) {
        this._pusher.subscribeWithChannelName(channelName);
    }

    subscribePresence(channelName: string, callback?: Function) {
        this._pusher.subscribeToPresenceChannelWithChannelName(channelName);
    }

    subscribePrivate(channelName: string, callback?: Function) {
        this._pusher.subscribeWithChannelName(channelName);
    }

    unsubscribe(channelName: string) {
        this._pusher.unsubscribe(channelName);
    }

}

class PusherDelegateImpl extends NSObject {
    public ObjCProtocols = [PusherDelegate];
    _events: Observable;

    public static initWithEvents(events: Observable) {
        const delegate: any = PusherDelegateImpl.new();
        delegate._events = events;
        return delegate;
    }

    changedConnectionStateFromTo(old: ConnectionState, new_: ConnectionState) {
        this._events.notify({
            eventName: "connection",
            object: new Observable({
                current: new_,
                previous: old
            })
        });
    }

    debugLogWithMessage(message: string) {
        this._events.notify({
            eventName: "debug",
            object: new Observable({
                message: message
            })
        });
    }

    failedToSubscribeToChannelWithNameResponseDataError(name: string, response: NSURLResponse, data: string, error: NSError) {
        this._events.notify({
            eventName: "channelSubscription",
            object: new Observable({
                channel: name,
                response: response.textEncodingName,
                data: data,
                error: error.localizedDescription
            })
        })
    }

    registeredForPushNotificationsWithClientId(clientId: string) {
    }

    subscribedToChannelWithName(name: string) {
        this._events.notify({
            eventName: "channelSubscription",
            object: new Observable({channel: name})
        });
    }

    subscribedToInterestWithName(name: string) {
        this._events.notify({
            eventName: "interestSubscription",
            object: new Observable({channel: name})
        })
    }

    unsubscribedFromInterestWithName(name: string) {
    }
}

export interface Options {
    activityTimeout: number;
    authorizer: any;
    cluster: string;
    encrypted: boolean;
    host: string;
    pongTimeout: string;
    wsPort: number;
    wssPort: number;
}
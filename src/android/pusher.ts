import {Observable} from "data/observable";
export class TNSPusher {
    private _pusher;
    private _options;
    private _events: Observable;

    constructor(apiKey: string, options?: Options) {
        this._events = new Observable();
        if (options) {
            this._options = new com.pusher.client.PusherOptions();
            if (options.activityTimeout) {
                this._options.setActivityTimeout(options.activityTimeout);
            }
            if (options.authorizer) {
                const _authorizer = com.pusher.client.util.HttpAuthorizer(options.authorizer);
                this._options.setAuthorizer(_authorizer);
            }
            if (options.cluster) {
                this._options.setCluster(options.cluster);
            }
            if (options.encrypted) {
                this._options.setEncrypted(options.encrypted);
            }
            if (options.host) {
                this._options.setHost(options.host);
            }
            if (options.pongTimeout) {
                this._options.setPongTimeout(options.pongTimeout);
            }
            if (options.wsPort) {
                this._options.setWsPort(options.wsPort);
            }
            if (options.wssPort) {
                this._options.setWssPort(options.wssPort);
            }
            this._pusher = new com.pusher.client.Pusher(apiKey, this._options);
        } else {
            this._pusher = new com.pusher.client.Pusher(apiKey);
        }
    }

    connect(callback?: Function) {
        if (typeof callback === 'function') {
            const owner = new WeakRef(this);
            this._pusher.connect(new com.pusher.client.connection.ConnectionEventListener({
                    onConnectionStateChange(change) {
                        owner.get()._events.notify({
                            eventName: "connection",
                            object: new Observable({
                                current: change.getCurrentState(),
                                previous: change.getPreviousState()
                            })
                        })
                    }, onError(message, code, e) {
                        callback(new Error(message));
                    }
                })
            )
        } else {
            this._pusher.connect();
        }
    }

    disconnect() {
        this._pusher.disconnect();
    }

    getChannel(channelName: string) {
        return this._pusher.getChannel();
    }

    getConnection() {
        return this._pusher.getConnection();
    }

    getPresenceChannel(channelName: string) {
        return this._pusher.getPresenceChannel();
    }

    getPrivateChannel(channelName: string) {
        return this._pusher.getPrivateChannel(channelName);
    }

    subscribe(channelName: string, callback?: Function) {
        if (typeof callback === 'function') {
            this._pusher.subscribe(channelName, new com.pusher.client.channel.ChannelEventListener({
                onSubscriptionSucceeded(channelName: string) {
                    callback(null, [{channel: channelName}]);
                }, onEvent(channelName: string, eventName: string, data: any) {
                    callback(null, [{channel: channelName, eventName: eventName, data: data}]);
                }
            }));
        } else {
            this._pusher.subscribe(channelName);
        }
    }

    subscribePresence(channelName: string, callback?: Function) {
        if (typeof callback === 'function') {
            this._pusher.subscribePresence(channelName, new com.pusher.client.channel.PresenceChannelEventListener({
                onUsersInformationReceived(channelName, users) {
                    callback(null, [{channel: channelName.getString(), users: users}]);
                },
                userSubscribed(channelName, user) {
                    callback(null, [{channel: channelName.getString(), user: user.getString()}]);
                },
                userUnsubscribed(channelName, user) {
                    callback(null, [{channel: channelName.getString(), user: user.getString()}]);
                }
            }));
        } else {
            this._pusher.subscribePresence(channelName);
        }
    }

    subscribePrivate(channelName: string, callback?: Function) {
        if (typeof callback === 'function') {
            this._pusher.subscribePrivate(channelName, new com.pusher.client.channel.PrivateChannelEventListener({
                onAuthenticationFailure(message: string, e: any) {
                    callback(new Error(message))
                },
                onSubscriptionSucceeded(channelName: string) {
                    callback(null, [{channel: channelName}]);
                }, onEvent(channelName: string, eventName: string, data: any) {
                    callback(null, [{channel: channelName, eventName: eventName, data: data}]);
                }
            }));
        } else {
            this._pusher.subscribePrivate(channelName);
        }
    }

    unsubscribe(channelName: string) {
        this._pusher.unsubscribe(channelName);
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
/// <reference path="./_helpers.d.ts" />
import javalangException = java.lang.Exception;
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export class AuthorizationFailureException {
				public constructor(param0: string, param1: javalangException);
				public constructor(param0: string);
				public constructor(param0: javalangException);
				public constructor();
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export class Authorizer {
				/**
				 * Constructs a new instance of the com.pusher.client.Authorizer interface with the provided implementation.
				 */
				public constructor(implementation: {
					authorize(param0: string, param1: string): string;
				});
				public authorize(param0: string, param1: string): string;
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.Channel.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.PresenceChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.PresenceChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.PrivateChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.PrivateChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.Connection.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export class Client {
				/**
				 * Constructs a new instance of the com.pusher.client.Client interface with the provided implementation.
				 */
				public constructor(implementation: {
					getConnection(): com.pusher.client.connection.Connection;
					connect(): void;
					connect(param0: com.pusher.client.connection.ConnectionEventListener, param1: native.Array<com.pusher.client.connection.ConnectionState>): void;
					disconnect(): void;
					subscribe(param0: string): com.pusher.client.channel.Channel;
					subscribe(param0: string, param1: com.pusher.client.channel.ChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.Channel;
					subscribePrivate(param0: string): com.pusher.client.channel.PrivateChannel;
					subscribePrivate(param0: string, param1: com.pusher.client.channel.PrivateChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PrivateChannel;
					subscribePresence(param0: string): com.pusher.client.channel.PresenceChannel;
					subscribePresence(param0: string, param1: com.pusher.client.channel.PresenceChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PresenceChannel;
					unsubscribe(param0: string): void;
					getChannel(param0: string): com.pusher.client.channel.Channel;
					getPrivateChannel(param0: string): com.pusher.client.channel.PrivateChannel;
					getPresenceChannel(param0: string): com.pusher.client.channel.PresenceChannel;
				});
				public subscribePresence(param0: string): com.pusher.client.channel.PresenceChannel;
				public subscribePresence(param0: string, param1: com.pusher.client.channel.PresenceChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PresenceChannel;
				public connect(param0: com.pusher.client.connection.ConnectionEventListener, param1: native.Array<com.pusher.client.connection.ConnectionState>): void;
				public subscribe(param0: string): com.pusher.client.channel.Channel;
				public unsubscribe(param0: string): void;
				public getChannel(param0: string): com.pusher.client.channel.Channel;
				public subscribe(param0: string, param1: com.pusher.client.channel.ChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.Channel;
				public connect(): void;
				public subscribePrivate(param0: string, param1: com.pusher.client.channel.PrivateChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PrivateChannel;
				public disconnect(): void;
				public subscribePrivate(param0: string): com.pusher.client.channel.PrivateChannel;
				public getPresenceChannel(param0: string): com.pusher.client.channel.PresenceChannel;
				public getPrivateChannel(param0: string): com.pusher.client.channel.PrivateChannel;
				public getConnection(): com.pusher.client.connection.Connection;
			}
		}
	}
}

/// <reference path="./com.pusher.client.PusherOptions.d.ts" />
/// <reference path="./com.pusher.client.channel.Channel.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.PresenceChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.PresenceChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.PrivateChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.PrivateChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.Connection.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export class Pusher {
				public subscribePresence(param0: string): com.pusher.client.channel.PresenceChannel;
				public subscribePresence(param0: string, param1: com.pusher.client.channel.PresenceChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PresenceChannel;
				public connect(param0: com.pusher.client.connection.ConnectionEventListener, param1: native.Array<com.pusher.client.connection.ConnectionState>): void;
				public subscribe(param0: string): com.pusher.client.channel.Channel;
				public constructor(param0: string);
				public unsubscribe(param0: string): void;
				public getChannel(param0: string): com.pusher.client.channel.Channel;
				public subscribe(param0: string, param1: com.pusher.client.channel.ChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.Channel;
				public connect(): void;
				public subscribePrivate(param0: string, param1: com.pusher.client.channel.PrivateChannelEventListener, param2: native.Array<string>): com.pusher.client.channel.PrivateChannel;
				public disconnect(): void;
				public subscribePrivate(param0: string): com.pusher.client.channel.PrivateChannel;
				public getPresenceChannel(param0: string): com.pusher.client.channel.PresenceChannel;
				public getPrivateChannel(param0: string): com.pusher.client.channel.PrivateChannel;
				public constructor(param0: string, param1: com.pusher.client.PusherOptions);
				public getConnection(): com.pusher.client.connection.Connection;
			}
		}
	}
}

import javanetProxy = java.net.Proxy;
/// <reference path="./com.pusher.client.Authorizer.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.net.Proxy.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export class PusherOptions {
				public static LIB_VERSION: string;
				public setPongTimeout(param0: number): com.pusher.client.PusherOptions;
				public setHost(param0: string): com.pusher.client.PusherOptions;
				public setWsPort(param0: number): com.pusher.client.PusherOptions;
				public setAuthorizer(param0: com.pusher.client.Authorizer): com.pusher.client.PusherOptions;
				public getProxy(): javanetProxy;
				public setProxy(param0: javanetProxy): com.pusher.client.PusherOptions;
				public setCluster(param0: string): com.pusher.client.PusherOptions;
				public constructor();
				public getAuthorizer(): com.pusher.client.Authorizer;
				public getActivityTimeout(): number;
				public setWssPort(param0: number): com.pusher.client.PusherOptions;
				public setEncrypted(param0: boolean): com.pusher.client.PusherOptions;
				public buildUrl(param0: string): string;
				public setActivityTimeout(param0: number): com.pusher.client.PusherOptions;
				public getPongTimeout(): number;
				public isEncrypted(): boolean;
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class Channel {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.Channel interface with the provided implementation.
					 */
					public constructor(implementation: {
						getName(): string;
						bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						isSubscribed(): boolean;
					});
					public isSubscribed(): boolean;
					public getName(): string;
					public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
					public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class ChannelEventListener {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.ChannelEventListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onSubscriptionSucceeded(param0: string): void;
						onEvent(param0: string, param1: string, param2: string): void;
					});
					public onEvent(param0: string, param1: string, param2: string): void;
					public onSubscriptionSucceeded(param0: string): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class ChannelState {
					public static INITIAL: com.pusher.client.channel.ChannelState;
					public static SUBSCRIBE_SENT: com.pusher.client.channel.ChannelState;
					public static SUBSCRIBED: com.pusher.client.channel.ChannelState;
					public static UNSUBSCRIBED: com.pusher.client.channel.ChannelState;
					public static FAILED: com.pusher.client.channel.ChannelState;
					public static values(): native.Array<com.pusher.client.channel.ChannelState>;
					public static valueOf(param0: string): com.pusher.client.channel.ChannelState;
				}
			}
		}
	}
}

import javautilSet = java.util.Set;
/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.User.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class PresenceChannel {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.PresenceChannel interface with the provided implementation.
					 */
					public constructor(implementation: {
						getUsers(): javautilSet;
						getMe(): com.pusher.client.channel.User;
						trigger(param0: string, param1: string): void;
						getName(): string;
						bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						isSubscribed(): boolean;
					});
					public isSubscribed(): boolean;
					public getName(): string;
					public getMe(): com.pusher.client.channel.User;
					public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
					public trigger(param0: string, param1: string): void;
					public getUsers(): javautilSet;
					public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.User.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class PresenceChannelEventListener {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.PresenceChannelEventListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onUsersInformationReceived(param0: string, param1: javautilSet): void;
						userSubscribed(param0: string, param1: com.pusher.client.channel.User): void;
						userUnsubscribed(param0: string, param1: com.pusher.client.channel.User): void;
						onAuthenticationFailure(param0: string, param1: javalangException): void;
						onSubscriptionSucceeded(param0: string): void;
						onEvent(param0: string, param1: string, param2: string): void;
					});
					public onAuthenticationFailure(param0: string, param1: javalangException): void;
					public onUsersInformationReceived(param0: string, param1: javautilSet): void;
					public onEvent(param0: string, param1: string, param2: string): void;
					public userUnsubscribed(param0: string, param1: com.pusher.client.channel.User): void;
					public onSubscriptionSucceeded(param0: string): void;
					public userSubscribed(param0: string, param1: com.pusher.client.channel.User): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class PrivateChannel {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.PrivateChannel interface with the provided implementation.
					 */
					public constructor(implementation: {
						trigger(param0: string, param1: string): void;
						getName(): string;
						bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						isSubscribed(): boolean;
					});
					public isSubscribed(): boolean;
					public getName(): string;
					public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
					public trigger(param0: string, param1: string): void;
					public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class PrivateChannelEventListener {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.PrivateChannelEventListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onAuthenticationFailure(param0: string, param1: javalangException): void;
						onSubscriptionSucceeded(param0: string): void;
						onEvent(param0: string, param1: string, param2: string): void;
					});
					public onAuthenticationFailure(param0: string, param1: javalangException): void;
					public onEvent(param0: string, param1: string, param2: string): void;
					public onSubscriptionSucceeded(param0: string): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class SubscriptionEventListener {
					/**
					 * Constructs a new instance of the com.pusher.client.channel.SubscriptionEventListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onEvent(param0: string, param1: string, param2: string): void;
					});
					public onEvent(param0: string, param1: string, param2: string): void;
				}
			}
		}
	}
}

import javalangClass = java.lang.Class;
import javalangObject = java.lang.Object;
/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export class User {
					public constructor(param0: string, param1: string);
					public toString(): string;
					public getId(): string;
					public getInfo(param0: javalangClass): javalangObject;
					public equals(param0: javalangObject): boolean;
					public getInfo(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelState.d.ts" />
/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.InternalChannel.d.ts" />
/// <reference path="./com.pusher.client.util.Factory.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export module impl {
					export class ChannelImpl {
						public static SUBSCRIPTION_SUCCESS_EVENT: string;
						public name: string;
						public state: com.pusher.client.channel.ChannelState;
						public toSubscribeMessage(): string;
						public getEventListener(): com.pusher.client.channel.ChannelEventListener;
						public onMessage(param0: string, param1: string): void;
						public compareTo(param0: com.pusher.client.channel.impl.InternalChannel): number;
						public setEventListener(param0: com.pusher.client.channel.ChannelEventListener): void;
						public toUnsubscribeMessage(): string;
						public getName(): string;
						public toString(): string;
						public getDisallowedNameExpressions(): native.Array<string>;
						public isSubscribed(): boolean;
						public constructor(param0: string, param1: com.pusher.client.util.Factory);
						public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public updateState(param0: com.pusher.client.channel.ChannelState): void;
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.Channel.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.PresenceChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.PrivateChannel.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.InternalChannel.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionStateChange.d.ts" />
/// <reference path="./com.pusher.client.connection.impl.InternalConnection.d.ts" />
/// <reference path="./com.pusher.client.util.Factory.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export module impl {
					export class ChannelManager {
						public onError(param0: string, param1: string, param2: javalangException): void;
						public getPrivateChannel(param0: string): com.pusher.client.channel.PrivateChannel;
						public getPresenceChannel(param0: string): com.pusher.client.channel.PresenceChannel;
						public subscribeTo(param0: com.pusher.client.channel.impl.InternalChannel, param1: com.pusher.client.channel.ChannelEventListener, param2: native.Array<string>): void;
						public onMessage(param0: string, param1: string): void;
						public getChannel(param0: string): com.pusher.client.channel.Channel;
						public onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
						public unsubscribeFrom(param0: string): void;
						public setConnection(param0: com.pusher.client.connection.impl.InternalConnection): void;
						public constructor(param0: com.pusher.client.util.Factory);
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelState.d.ts" />
/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export module impl {
					export class InternalChannel {
						/**
						 * Constructs a new instance of the com.pusher.client.channel.impl.InternalChannel interface with the provided implementation.
						 */
						public constructor(implementation: {
							toSubscribeMessage(): string;
							toUnsubscribeMessage(): string;
							onMessage(param0: string, param1: string): void;
							updateState(param0: com.pusher.client.channel.ChannelState): void;
							setEventListener(param0: com.pusher.client.channel.ChannelEventListener): void;
							getEventListener(): com.pusher.client.channel.ChannelEventListener;
							getName(): string;
							bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
							unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
							isSubscribed(): boolean;
						});
						public toSubscribeMessage(): string;
						public getEventListener(): com.pusher.client.channel.ChannelEventListener;
						public onMessage(param0: string, param1: string): void;
						public setEventListener(param0: com.pusher.client.channel.ChannelEventListener): void;
						public isSubscribed(): boolean;
						public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public toUnsubscribeMessage(): string;
						public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public updateState(param0: com.pusher.client.channel.ChannelState): void;
						public getName(): string;
					}
				}
			}
		}
	}
}

import javalangInteger = java.lang.Integer;
import javautilList = java.util.List;
import javautilMap = java.util.Map;
/// <reference path="./com.pusher.client.Authorizer.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelState.d.ts" />
/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.User.d.ts" />
/// <reference path="./com.pusher.client.connection.impl.InternalConnection.d.ts" />
/// <reference path="./com.pusher.client.util.Factory.d.ts" />
/// <reference path="./java.lang.Integer.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export module impl {
					export class PresenceChannelImpl extends com.pusher.client.channel.impl.PrivateChannelImpl implements com.pusher.client.channel.PresenceChannel {
						public toSubscribeMessage(): string;
						public trigger(param0: string, param1: string): void;
						public getEventListener(): com.pusher.client.channel.ChannelEventListener;
						public onMessage(param0: string, param1: string): void;
						public setEventListener(param0: com.pusher.client.channel.ChannelEventListener): void;
						public toUnsubscribeMessage(): string;
						public constructor(param0: com.pusher.client.connection.impl.InternalConnection, param1: string, param2: com.pusher.client.Authorizer, param3: com.pusher.client.util.Factory);
						public getName(): string;
						public toString(): string;
						public getDisallowedNameExpressions(): native.Array<string>;
						public isSubscribed(): boolean;
						public constructor(param0: string, param1: com.pusher.client.util.Factory);
						public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public getUsers(): javautilSet;
						public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public updateState(param0: com.pusher.client.channel.ChannelState): void;
						public getMe(): com.pusher.client.channel.User;
					}
					export module PresenceChannelImpl {
						export class MemberData {
							public userId: string;
							public userInfo: javalangObject;
						}
						export class Presence {
							public presence: com.pusher.client.channel.impl.PresenceChannelImpl.PresenceData;
						}
						export class PresenceData {
							public count: javalangInteger;
							public ids: javautilList;
							public hash: javautilMap;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.Authorizer.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelEventListener.d.ts" />
/// <reference path="./com.pusher.client.channel.ChannelState.d.ts" />
/// <reference path="./com.pusher.client.channel.SubscriptionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.impl.InternalConnection.d.ts" />
/// <reference path="./com.pusher.client.util.Factory.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module channel {
				export module impl {
					export class PrivateChannelImpl extends com.pusher.client.channel.impl.ChannelImpl implements com.pusher.client.channel.PrivateChannel {
						public toSubscribeMessage(): string;
						public trigger(param0: string, param1: string): void;
						public getEventListener(): com.pusher.client.channel.ChannelEventListener;
						public onMessage(param0: string, param1: string): void;
						public setEventListener(param0: com.pusher.client.channel.ChannelEventListener): void;
						public toUnsubscribeMessage(): string;
						public constructor(param0: com.pusher.client.connection.impl.InternalConnection, param1: string, param2: com.pusher.client.Authorizer, param3: com.pusher.client.util.Factory);
						public getName(): string;
						public toString(): string;
						public getDisallowedNameExpressions(): native.Array<string>;
						public isSubscribed(): boolean;
						public constructor(param0: string, param1: com.pusher.client.util.Factory);
						public bind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public unbind(param0: string, param1: com.pusher.client.channel.SubscriptionEventListener): void;
						public updateState(param0: com.pusher.client.channel.ChannelState): void;
						public getAuthResponse(): string;
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export class Connection {
					/**
					 * Constructs a new instance of the com.pusher.client.connection.Connection interface with the provided implementation.
					 */
					public constructor(implementation: {
						connect(): void;
						bind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): void;
						unbind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): boolean;
						getState(): com.pusher.client.connection.ConnectionState;
						getSocketId(): string;
					});
					public unbind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): boolean;
					public getSocketId(): string;
					public getState(): com.pusher.client.connection.ConnectionState;
					public connect(): void;
					public bind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionStateChange.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export class ConnectionEventListener {
					/**
					 * Constructs a new instance of the com.pusher.client.connection.ConnectionEventListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
						onError(param0: string, param1: string, param2: javalangException): void;
					});
					public onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
					public onError(param0: string, param1: string, param2: javalangException): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export class ConnectionState {
					public static CONNECTING: com.pusher.client.connection.ConnectionState;
					public static CONNECTED: com.pusher.client.connection.ConnectionState;
					public static DISCONNECTING: com.pusher.client.connection.ConnectionState;
					public static DISCONNECTED: com.pusher.client.connection.ConnectionState;
					public static RECONNECTING: com.pusher.client.connection.ConnectionState;
					public static ALL: com.pusher.client.connection.ConnectionState;
					public static valueOf(param0: string): com.pusher.client.connection.ConnectionState;
					public static values(): native.Array<com.pusher.client.connection.ConnectionState>;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export class ConnectionStateChange {
					public constructor(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionState);
					public equals(param0: javalangObject): boolean;
					public getPreviousState(): com.pusher.client.connection.ConnectionState;
					public hashCode(): number;
					public getCurrentState(): com.pusher.client.connection.ConnectionState;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export module impl {
					export class InternalConnection {
						/**
						 * Constructs a new instance of the com.pusher.client.connection.impl.InternalConnection interface with the provided implementation.
						 */
						public constructor(implementation: {
							sendMessage(param0: string): void;
							disconnect(): void;
							connect(): void;
							bind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): void;
							unbind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): boolean;
							getState(): com.pusher.client.connection.ConnectionState;
							getSocketId(): string;
						});
						public sendMessage(param0: string): void;
						public disconnect(): void;
						public bind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): void;
						public getSocketId(): string;
						public unbind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): boolean;
						public getState(): com.pusher.client.connection.ConnectionState;
						public connect(): void;
					}
				}
			}
		}
	}
}

import javanetURI = java.net.URI;
/// <reference path="./com.pusher.client.connection.websocket.WebSocketListener.d.ts" />
/// <reference path="./com.pusher.java_websocket.handshake.ServerHandshake.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.net.Proxy.d.ts" />
/// <reference path="./java.net.URI.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export module websocket {
					export class WebSocketClientWrapper {
						public onError(param0: javalangException): void;
						public onClose(param0: number, param1: string, param2: boolean): void;
						public removeWebSocketListener(): void;
						public onMessage(param0: string): void;
						public constructor(param0: javanetURI, param1: javanetProxy, param2: com.pusher.client.connection.websocket.WebSocketListener);
						public onOpen(param0: com.pusher.java_websocket.handshake.ServerHandshake): void;
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionEventListener.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionState.d.ts" />
/// <reference path="./com.pusher.client.util.Factory.d.ts" />
/// <reference path="./com.pusher.java_websocket.handshake.ServerHandshake.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.net.Proxy.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export module websocket {
					export class WebSocketConnection {
						public disconnect(): void;
						public bind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): void;
						public sendMessage(param0: string): void;
						public getSocketId(): string;
						public onError(param0: javalangException): void;
						public onClose(param0: number, param1: string, param2: boolean): void;
						public onMessage(param0: string): void;
						public constructor(param0: string, param1: number, param2: number, param3: javanetProxy, param4: com.pusher.client.util.Factory);
						public unbind(param0: com.pusher.client.connection.ConnectionState, param1: com.pusher.client.connection.ConnectionEventListener): boolean;
						public getState(): com.pusher.client.connection.ConnectionState;
						public connect(): void;
						public onOpen(param0: com.pusher.java_websocket.handshake.ServerHandshake): void;
					}
					export module WebSocketConnection {
						export class ActivityTimer {
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.java_websocket.handshake.ServerHandshake.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module connection {
				export module websocket {
					export class WebSocketListener {
						/**
						 * Constructs a new instance of the com.pusher.client.connection.websocket.WebSocketListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onOpen(param0: com.pusher.java_websocket.handshake.ServerHandshake): void;
							onMessage(param0: string): void;
							onClose(param0: number, param1: string, param2: boolean): void;
							onError(param0: javalangException): void;
						});
						public onError(param0: javalangException): void;
						public onClose(param0: number, param1: string, param2: boolean): void;
						public onMessage(param0: string): void;
						public onOpen(param0: com.pusher.java_websocket.handshake.ServerHandshake): void;
					}
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionStateChange.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module example {
				export class ExampleApp {
					public onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
					public onEvent(param0: string, param1: string, param2: string): void;
					public static main(param0: native.Array<string>): void;
					public constructor(param0: native.Array<string>);
					public onSubscriptionSucceeded(param0: string): void;
					public onError(param0: string, param1: string, param2: javalangException): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.channel.User.d.ts" />
/// <reference path="./com.pusher.client.connection.ConnectionStateChange.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Set.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module example {
				export class PresenceChannelExampleApp {
					public onAuthenticationFailure(param0: string, param1: javalangException): void;
					public onUsersInformationReceived(param0: string, param1: javautilSet): void;
					public onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
					public onEvent(param0: string, param1: string, param2: string): void;
					public static main(param0: native.Array<string>): void;
					public constructor(param0: native.Array<string>);
					public userUnsubscribed(param0: string, param1: com.pusher.client.channel.User): void;
					public onSubscriptionSucceeded(param0: string): void;
					public onError(param0: string, param1: string, param2: javalangException): void;
					public userSubscribed(param0: string, param1: com.pusher.client.channel.User): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.client.connection.ConnectionStateChange.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module example {
				export class PrivateChannelExampleApp {
					public onAuthenticationFailure(param0: string, param1: javalangException): void;
					public onConnectionStateChange(param0: com.pusher.client.connection.ConnectionStateChange): void;
					public onEvent(param0: string, param1: string, param2: string): void;
					public static main(param0: native.Array<string>): void;
					public constructor(param0: native.Array<string>);
					public onSubscriptionSucceeded(param0: string): void;
					public onError(param0: string, param1: string, param2: javalangException): void;
				}
			}
		}
	}
}

/// <reference path="./com.pusher.java_websocket.handshake.ServerHandshake.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module example {
				export class SimpleWebSocket {
					public onError(param0: javalangException): void;
					public constructor();
					public onMessage(param0: string): void;
					public onOpen(param0: com.pusher.java_websocket.handshake.ServerHandshake): void;
					public static main(param0: native.Array<string>): void;
					public onClose(param0: number, param1: string, param2: boolean): void;
				}
			}
		}
	}
}

import javautilconcurrentScheduledExecutorService = java.util.concurrent.ScheduledExecutorService;
import javalangRunnable = java.lang.Runnable;
import javalangThread = java.lang.Thread;
/// <reference path="./com.pusher.client.Authorizer.d.ts" />
/// <reference path="./com.pusher.client.PusherOptions.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.ChannelImpl.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.ChannelManager.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.PresenceChannelImpl.d.ts" />
/// <reference path="./com.pusher.client.channel.impl.PrivateChannelImpl.d.ts" />
/// <reference path="./com.pusher.client.connection.impl.InternalConnection.d.ts" />
/// <reference path="./com.pusher.client.connection.websocket.WebSocketClientWrapper.d.ts" />
/// <reference path="./com.pusher.client.connection.websocket.WebSocketListener.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.lang.Thread.d.ts" />
/// <reference path="./java.net.Proxy.d.ts" />
/// <reference path="./java.net.URI.d.ts" />
/// <reference path="./java.util.concurrent.ScheduledExecutorService.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module util {
				export class Factory {
					public newPublicChannel(param0: string): com.pusher.client.channel.impl.ChannelImpl;
					public newPresenceChannel(param0: com.pusher.client.connection.impl.InternalConnection, param1: string, param2: com.pusher.client.Authorizer): com.pusher.client.channel.impl.PresenceChannelImpl;
					public getConnection(param0: string, param1: com.pusher.client.PusherOptions): com.pusher.client.connection.impl.InternalConnection;
					public constructor();
					public newWebSocketClientWrapper(param0: javanetURI, param1: javanetProxy, param2: com.pusher.client.connection.websocket.WebSocketListener): com.pusher.client.connection.websocket.WebSocketClientWrapper;
					public getTimers(): javautilconcurrentScheduledExecutorService;
					public getChannelManager(): com.pusher.client.channel.impl.ChannelManager;
					public newPrivateChannel(param0: com.pusher.client.connection.impl.InternalConnection, param1: string, param2: com.pusher.client.Authorizer): com.pusher.client.channel.impl.PrivateChannelImpl;
					public queueOnEventThread(param0: javalangRunnable): void;
					public shutdownThreads(): void;
				}
				export module Factory {
					export class DaemonThreadFactory {
						public newThread(param0: javalangRunnable): javalangThread;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

import javalangBoolean = java.lang.Boolean;
import javautilHashMap = java.util.HashMap;
/// <reference path="./java.lang.Boolean.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.HashMap.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module pusher {
		export module client {
			export module util {
				export class HttpAuthorizer {
					public isSSL(): javalangBoolean;
					public constructor(param0: string);
					public setHeaders(param0: javautilMap): void;
					public authorize(param0: string, param1: string): string;
					public setQueryStringParameters(param0: javautilHashMap): void;
				}
			}
		}
	}
}


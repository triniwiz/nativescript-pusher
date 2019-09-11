declare module com {
	export module pusher {
		export module pushnotifications {
			export class BeamsCallback<S, E>  extends java.lang.Object {
				public static class: java.lang.Class<com.pusher.pushnotifications.BeamsCallback<any,any>>;
				/**
				 * Constructs a new instance of the com.pusher.pushnotifications.BeamsCallback<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onSuccess(param0: native.Array<S>): void;
					onFailure(param0: E): void;
				});
				public constructor();
				public onFailure(param0: E): void;
				public onSuccess(param0: native.Array<S>): void;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class BuildConfig {
				public static class: java.lang.Class<com.pusher.pushnotifications.BuildConfig>;
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class InterestsChangedEvent extends com.pusher.pushnotifications.ServerSyncEvent {
				public static class: java.lang.Class<com.pusher.pushnotifications.InterestsChangedEvent>;
				public getInterests(): java.util.Set<string>;
				public hashCode(): number;
				public component1(): java.util.Set<string>;
				public equals(param0: any): boolean;
				public constructor(param0: java.util.Set<string>);
				public toString(): string;
				public copy(param0: java.util.Set<string>): com.pusher.pushnotifications.InterestsChangedEvent;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class NoopBeamsCallback<S, E>  extends com.pusher.pushnotifications.BeamsCallback<any,any> {
				public static class: java.lang.Class<com.pusher.pushnotifications.NoopBeamsCallback<any,any>>;
				public onSuccess(param0: native.Array<any>): void;
				public onFailure(param0: any): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PushNotificationReceivedListener {
				public static class: java.lang.Class<com.pusher.pushnotifications.PushNotificationReceivedListener>;
				/**
				 * Constructs a new instance of the com.pusher.pushnotifications.PushNotificationReceivedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onMessageReceived(param0: com.google.firebase.messaging.RemoteMessage): void;
				});
				public constructor();
				public onMessageReceived(param0: com.google.firebase.messaging.RemoteMessage): void;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PushNotifications {
				public static class: java.lang.Class<com.pusher.pushnotifications.PushNotifications>;
				public static tokenProvider: com.pusher.pushnotifications.auth.TokenProvider;
				public static setOnMessageReceivedListenerForVisibleActivity(param0: globalAndroid.app.Activity, param1: com.pusher.pushnotifications.PushNotificationReceivedListener): void;
				/** @deprecated */
				public static getSubscriptions(): java.util.Set<string>;
				public static clearAllState(): void;
				public static clearDeviceInterests(): void;
				/** @deprecated */
				public static subscribe(param0: string): void;
				public static setUserId(param0: string, param1: com.pusher.pushnotifications.auth.TokenProvider, param2: com.pusher.pushnotifications.BeamsCallback<java.lang.Void,com.pusher.pushnotifications.PusherCallbackError>): void;
				/** @deprecated */
				public static unsubscribeAll(): void;
				/** @deprecated */
				public static setOnSubscriptionsChangedListener(param0: com.pusher.pushnotifications.SubscriptionsChangedListener): void;
				/** @deprecated */
				public static setSubscriptions(param0: java.util.Set<string>): void;
				public constructor();
				public static getDeviceInterests(): java.util.Set<string>;
				public static setUserId(param0: string, param1: com.pusher.pushnotifications.auth.TokenProvider): void;
				public static stop(): void;
				/** @deprecated */
				public static unsubscribe(param0: string): void;
				public static setDeviceInterests(param0: java.util.Set<string>): void;
				public static start(param0: globalAndroid.content.Context, param1: string): com.pusher.pushnotifications.PushNotificationsInstance;
				public static removeDeviceInterest(param0: string): void;
				public static addDeviceInterest(param0: string): void;
				public static setOnDeviceInterestsChangedListener(param0: com.pusher.pushnotifications.SubscriptionsChangedListener): void;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PushNotificationsInstance {
				public static class: java.lang.Class<com.pusher.pushnotifications.PushNotificationsInstance>;
				public static Companion: com.pusher.pushnotifications.PushNotificationsInstance.Companion;
				public getDeviceInterests(): java.util.Set<string>;
				public constructor(param0: globalAndroid.content.Context, param1: string);
				public clearAllState(): void;
				public setUserId(param0: string, param1: com.pusher.pushnotifications.auth.TokenProvider, param2: com.pusher.pushnotifications.BeamsCallback<java.lang.Void,com.pusher.pushnotifications.PusherCallbackError>): void;
				public setOnDeviceInterestsChangedListener(param0: com.pusher.pushnotifications.SubscriptionsChangedListener): void;
				/** @deprecated */
				public subscribe(param0: string): void;
				public onApplicationStarted$pushnotifications_release(): void;
				public start(): com.pusher.pushnotifications.PushNotificationsInstance;
				/** @deprecated */
				public setSubscriptions(param0: java.util.Set<string>): void;
				/** @deprecated */
				public getSubscriptions(): java.util.Set<string>;
				public addDeviceInterest(param0: string): void;
				public stop(): void;
				/** @deprecated */
				public setOnSubscriptionsChangedListener(param0: com.pusher.pushnotifications.SubscriptionsChangedListener): void;
				/** @deprecated */
				public unsubscribe(param0: string): void;
				/** @deprecated */
				public unsubscribeAll(): void;
				public removeDeviceInterest(param0: string): void;
				public clearDeviceInterests(): void;
				public setDeviceInterests(param0: java.util.Set<string>): void;
				public setUserId(param0: string, param1: com.pusher.pushnotifications.auth.TokenProvider): void;
			}
			export module PushNotificationsInstance {
				export class Companion {
					public static class: java.lang.Class<com.pusher.pushnotifications.PushNotificationsInstance.Companion>;
					public getInstanceId(param0: globalAndroid.content.Context): string;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PusherAlreadyRegisteredAnotherUserIdException {
				public static class: java.lang.Class<com.pusher.pushnotifications.PusherAlreadyRegisteredAnotherUserIdException>;
				public constructor(param0: string);
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PusherAlreadyRegisteredException {
				public static class: java.lang.Class<com.pusher.pushnotifications.PusherAlreadyRegisteredException>;
				public constructor(param0: string);
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class PusherCallbackError {
				public static class: java.lang.Class<com.pusher.pushnotifications.PusherCallbackError>;
				public component1(): string;
				public hashCode(): number;
				public copy(param0: string, param1: java.lang.Throwable): com.pusher.pushnotifications.PusherCallbackError;
				public equals(param0: any): boolean;
				public constructor(param0: string, param1: java.lang.Throwable);
				public component2(): java.lang.Throwable;
				public getMessage(): string;
				public getCause(): java.lang.Throwable;
				public toString(): string;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export abstract class ServerSyncEvent {
				public static class: java.lang.Class<com.pusher.pushnotifications.ServerSyncEvent>;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class ServerSyncEventHandler {
				public static class: java.lang.Class<com.pusher.pushnotifications.ServerSyncEventHandler>;
				public static Companion: com.pusher.pushnotifications.ServerSyncEventHandler.Companion;
				public setOnSubscriptionsChangedListener(param0: com.pusher.pushnotifications.SubscriptionsChangedListener): void;
				public getOnSubscriptionsChangedListener(): com.pusher.pushnotifications.SubscriptionsChangedListener;
				public addUserIdCallback(param0: string, param1: com.pusher.pushnotifications.BeamsCallback<java.lang.Void,com.pusher.pushnotifications.PusherCallbackError>): void;
				public handleMessage(param0: globalAndroid.os.Message): void;
				public getUserIdToCallbacks(): java.util.Map<string,java.util.List<com.pusher.pushnotifications.BeamsCallback<java.lang.Void,com.pusher.pushnotifications.PusherCallbackError>>>;
				public setUserIdToCallbacks(param0: java.util.Map<string,java.util.List<com.pusher.pushnotifications.BeamsCallback<java.lang.Void,com.pusher.pushnotifications.PusherCallbackError>>>): void;
			}
			export module ServerSyncEventHandler {
				export class Companion {
					public static class: java.lang.Class<com.pusher.pushnotifications.ServerSyncEventHandler.Companion>;
					public obtain$pushnotifications_release(param0: string, param1: globalAndroid.os.Looper): com.pusher.pushnotifications.ServerSyncEventHandler;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class SubscriptionsChangedListener {
				public static class: java.lang.Class<com.pusher.pushnotifications.SubscriptionsChangedListener>;
				/**
				 * Constructs a new instance of the com.pusher.pushnotifications.SubscriptionsChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onSubscriptionsChanged(param0: java.util.Set<string>): void;
				});
				public constructor();
				public onSubscriptionsChanged(param0: java.util.Set<string>): void;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export class UserIdSet extends com.pusher.pushnotifications.ServerSyncEvent {
				public static class: java.lang.Class<com.pusher.pushnotifications.UserIdSet>;
				public constructor(param0: string, param1: com.pusher.pushnotifications.PusherCallbackError);
				public component2(): com.pusher.pushnotifications.PusherCallbackError;
				public component1(): string;
				public hashCode(): number;
				public getPusherCallbackError(): com.pusher.pushnotifications.PusherCallbackError;
				public equals(param0: any): boolean;
				public getUserId(): string;
				public toString(): string;
				public copy(param0: string, param1: com.pusher.pushnotifications.PusherCallbackError): com.pusher.pushnotifications.UserIdSet;
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class DeviceMetadata {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.DeviceMetadata>;
					public constructor(param0: string, param1: string);
					public equals(param0: any): boolean;
					public copy(param0: string, param1: string): com.pusher.pushnotifications.api.DeviceMetadata;
					public toString(): string;
					public getSdkVersion(): string;
					public component1(): string;
					public component2(): string;
					public getAndroidVersion(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class NOKResponse {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.NOKResponse>;
					public constructor(param0: string, param1: string);
					public copy(param0: string, param1: string): com.pusher.pushnotifications.api.NOKResponse;
					public equals(param0: any): boolean;
					public getError(): string;
					public toString(): string;
					public component1(): string;
					public component2(): string;
					public getMessage(): string;
					public getDescription(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class OperationCallback<T>  extends java.lang.Object {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.OperationCallback<any>>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.api.OperationCallback<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onSuccess(param0: T): void;
						onFailure(param0: java.lang.Throwable): void;
						<clinit>(): void;
					});
					public constructor();
					public static Companion: com.pusher.pushnotifications.api.OperationCallback.Companion;
					public onSuccess(param0: T): void;
					public onFailure(param0: java.lang.Throwable): void;
				}
				export module OperationCallback {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.api.OperationCallback.Companion>;
						public setNoop(param0: com.pusher.pushnotifications.api.OperationCallback<any>): void;
						public getNoop(): com.pusher.pushnotifications.api.OperationCallback<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class OperationCallbackNoArgs {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.OperationCallbackNoArgs>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.api.OperationCallbackNoArgs interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onSuccess(): void;
						onFailure(param0: java.lang.Throwable): void;
						<clinit>(): void;
					});
					public constructor();
					public static Companion: com.pusher.pushnotifications.api.OperationCallbackNoArgs.Companion;
					public onSuccess(): void;
					public onFailure(param0: java.lang.Throwable): void;
				}
				export module OperationCallbackNoArgs {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.api.OperationCallbackNoArgs.Companion>;
						public getNoop(): com.pusher.pushnotifications.api.OperationCallbackNoArgs;
						public setNoop(param0: com.pusher.pushnotifications.api.OperationCallbackNoArgs): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationService {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationService>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.api.PushNotificationService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						register(param0: string, param1: com.pusher.pushnotifications.api.RegisterRequest): retrofit2.Call<com.pusher.pushnotifications.api.RegisterResponse>;
						refreshToken(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RefreshToken): retrofit2.Call<java.lang.Void>;
						subscribe(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
						unsubscribe(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
						setSubscriptions(param0: string, param1: string, param2: com.pusher.pushnotifications.api.SetSubscriptionsRequest): retrofit2.Call<java.lang.Void>;
						setMetadata(param0: string, param1: string, param2: com.pusher.pushnotifications.api.DeviceMetadata): retrofit2.Call<java.lang.Void>;
						setUserId(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
						delete(param0: string, param1: string): retrofit2.Call<java.lang.Void>;
					});
					public constructor();
					public delete(param0: string, param1: string): retrofit2.Call<java.lang.Void>;
					public setSubscriptions(param0: string, param1: string, param2: com.pusher.pushnotifications.api.SetSubscriptionsRequest): retrofit2.Call<java.lang.Void>;
					public setUserId(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
					public unsubscribe(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
					public subscribe(param0: string, param1: string, param2: string): retrofit2.Call<java.lang.Void>;
					public refreshToken(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RefreshToken): retrofit2.Call<java.lang.Void>;
					public setMetadata(param0: string, param1: string, param2: com.pusher.pushnotifications.api.DeviceMetadata): retrofit2.Call<java.lang.Void>;
					public register(param0: string, param1: com.pusher.pushnotifications.api.RegisterRequest): retrofit2.Call<com.pusher.pushnotifications.api.RegisterResponse>;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationServiceKt {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationServiceKt>;
					public static getUnknownNOKResponse(): com.pusher.pushnotifications.api.NOKResponse;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationsAPI {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPI>;
					public constructor(param0: string, param1: string);
					public registerFCM(param0: string, param1: java.util.List<string>, param2: com.pusher.pushnotifications.api.RetryStrategy<com.pusher.pushnotifications.api.PushNotificationsAPI.RegisterDeviceResult>): com.pusher.pushnotifications.api.PushNotificationsAPI.RegisterDeviceResult;
					public subscribe(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public setSubscriptions(param0: string, param1: java.util.Set<string>, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public unsubscribe(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public setMetadata(param0: string, param1: com.pusher.pushnotifications.api.DeviceMetadata, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public setUserId(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public delete(param0: string, param1: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
					public refreshToken(param0: string, param1: string, param2: com.pusher.pushnotifications.api.RetryStrategy<kotlin.Unit>): void;
				}
				export module PushNotificationsAPI {
					export class RegisterDeviceResult {
						public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPI.RegisterDeviceResult>;
						public getInitialInterests(): java.util.Set<string>;
						public getDeviceId(): string;
						public component1(): string;
						public hashCode(): number;
						public equals(param0: any): boolean;
						public copy(param0: string, param1: java.util.Set<string>): com.pusher.pushnotifications.api.PushNotificationsAPI.RegisterDeviceResult;
						public constructor(param0: string, param1: java.util.Set<string>);
						public toString(): string;
						public component2(): java.util.Set<string>;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationsAPIBadJWT extends com.pusher.pushnotifications.api.PushNotificationsAPIException {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPIBadJWT>;
					public getReason(): string;
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationsAPIBadRequest extends com.pusher.pushnotifications.api.PushNotificationsAPIException {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPIBadRequest>;
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationsAPIDeviceNotFound extends com.pusher.pushnotifications.api.PushNotificationsAPIException {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPIDeviceNotFound>;
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PushNotificationsAPIException {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PushNotificationsAPIException>;
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class PusherLibraryHeaderInterceptor {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.PusherLibraryHeaderInterceptor>;
					public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class RefreshToken {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.RefreshToken>;
					public copy(param0: string): com.pusher.pushnotifications.api.RefreshToken;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public constructor(param0: string);
					public getToken(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class RegisterRequest {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.RegisterRequest>;
					public equals(param0: any): boolean;
					public getMetadata(): com.pusher.pushnotifications.api.DeviceMetadata;
					public toString(): string;
					public component1(): string;
					public getKnownPreviousClientIds(): java.util.List<string>;
					public component2(): java.util.List<string>;
					public getToken(): string;
					public constructor(param0: string, param1: java.util.List<string>, param2: com.pusher.pushnotifications.api.DeviceMetadata);
					public component3(): com.pusher.pushnotifications.api.DeviceMetadata;
					public hashCode(): number;
					public copy(param0: string, param1: java.util.List<string>, param2: com.pusher.pushnotifications.api.DeviceMetadata): com.pusher.pushnotifications.api.RegisterRequest;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class RegisterResponse {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.RegisterResponse>;
					public equals(param0: any): boolean;
					public constructor(param0: string, param1: java.util.Set<string>);
					public toString(): string;
					public getId(): string;
					public component1(): string;
					public getInitialInterestSet(): java.util.Set<string>;
					public copy(param0: string, param1: java.util.Set<string>): com.pusher.pushnotifications.api.RegisterResponse;
					public component2(): java.util.Set<string>;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class RegisterResponseError {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.RegisterResponseError>;
					public getTokenValidationResponse(): com.pusher.pushnotifications.api.TokenValidationResponse;
					public equals(param0: any): boolean;
					public getError(): string;
					public toString(): string;
					public getDesc(): string;
					public component1(): string;
					public copy(param0: string, param1: string, param2: com.pusher.pushnotifications.api.TokenValidationResponse): com.pusher.pushnotifications.api.RegisterResponseError;
					public component2(): string;
					public getMessage(): string;
					public component3(): com.pusher.pushnotifications.api.TokenValidationResponse;
					public hashCode(): number;
					public constructor(param0: string, param1: string, param2: com.pusher.pushnotifications.api.TokenValidationResponse);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export abstract class RetryStrategy<T>  extends java.lang.Object {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.RetryStrategy<any>>;
					public retry(param0: kotlin.jvm.functions.Function0<any>): T;
				}
				export module RetryStrategy {
					export class JustDont<T>  extends com.pusher.pushnotifications.api.RetryStrategy<any> {
						public static class: java.lang.Class<com.pusher.pushnotifications.api.RetryStrategy.JustDont<any>>;
						public constructor();
						public retry(param0: kotlin.jvm.functions.Function0<any>): any;
					}
					export class WithInfiniteExpBackOff<T>  extends com.pusher.pushnotifications.api.RetryStrategy<any> {
						public static class: java.lang.Class<com.pusher.pushnotifications.api.RetryStrategy.WithInfiniteExpBackOff<any>>;
						public static Companion: com.pusher.pushnotifications.api.RetryStrategy.WithInfiniteExpBackOff.Companion;
						public constructor();
						public retry(param0: kotlin.jvm.functions.Function0<any>): any;
					}
					export module WithInfiniteExpBackOff {
						export class Companion {
							public static class: java.lang.Class<com.pusher.pushnotifications.api.RetryStrategy.WithInfiniteExpBackOff.Companion>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class SetSubscriptionsRequest {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.SetSubscriptionsRequest>;
					public equals(param0: any): boolean;
					public getInterests(): java.util.Set<string>;
					public toString(): string;
					public constructor(param0: java.util.Set<string>);
					public component1(): java.util.Set<string>;
					public hashCode(): number;
					public copy(param0: java.util.Set<string>): com.pusher.pushnotifications.api.SetSubscriptionsRequest;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module api {
				export class TokenValidationResponse {
					public static class: java.lang.Class<com.pusher.pushnotifications.api.TokenValidationResponse>;
					public getClientId(): string;
					public copy(param0: string, param1: string, param2: string, param3: string, param4: string, param5: boolean, param6: string, param7: string): com.pusher.pushnotifications.api.TokenValidationResponse;
					public getMessageId(): string;
					public component2(): string;
					public component5(): string;
					public component7(): string;
					public component3(): string;
					public getPlatform(): string;
					public component6(): boolean;
					public getSentDeviceToken(): string;
					public equals(param0: any): boolean;
					public getError(): string;
					public toString(): string;
					public component1(): string;
					public component8(): string;
					public getReceivedDeviceToken(): string;
					public constructor(param0: string, param1: string, param2: string, param3: string, param4: string, param5: boolean, param6: string, param7: string);
					public component4(): string;
					public hashCode(): number;
					public getDetails(): string;
					public getSuccess(): boolean;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class AuthData {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.AuthData>;
					public equals(param0: any): boolean;
					public getHeaders(): java.util.Map<string,string>;
					public component2(): java.util.Map<string,string>;
					public toString(): string;
					public copy(param0: java.util.Map<string,string>, param1: java.util.Map<string,string>): com.pusher.pushnotifications.auth.AuthData;
					public constructor();
					public getQueryParams(): java.util.Map<string,string>;
					public hashCode(): number;
					public constructor(param0: java.util.Map<string,string>, param1: java.util.Map<string,string>);
					public component1(): java.util.Map<string,string>;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class AuthDataGetter {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.AuthDataGetter>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.auth.AuthDataGetter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getAuthData(): com.pusher.pushnotifications.auth.AuthData;
					});
					public constructor();
					public getAuthData(): com.pusher.pushnotifications.auth.AuthData;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class BeamsTokenProvider extends com.pusher.pushnotifications.auth.TokenProvider {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.BeamsTokenProvider>;
					public constructor(param0: string, param1: com.pusher.pushnotifications.auth.AuthDataGetter);
					public fetchToken(param0: string): string;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class BeamsTokenProviderKt {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.BeamsTokenProviderKt>;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class TokenProvider {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.TokenProvider>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.auth.TokenProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						fetchToken(param0: string): string;
					});
					public constructor();
					public fetchToken(param0: string): string;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module auth {
				export class TokenResponse {
					public static class: java.lang.Class<com.pusher.pushnotifications.auth.TokenResponse>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public constructor(param0: string);
					public getToken(): string;
					public hashCode(): number;
					public copy(param0: string): com.pusher.pushnotifications.auth.TokenResponse;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module fcm {
				export class EmptyMessagingService extends com.pusher.pushnotifications.fcm.MessagingService {
					public static class: java.lang.Class<com.pusher.pushnotifications.fcm.EmptyMessagingService>;
					public onMessageReceived(param0: com.google.firebase.messaging.RemoteMessage): void;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module fcm {
				export abstract class MessagingService {
					public static class: java.lang.Class<com.pusher.pushnotifications.fcm.MessagingService>;
					public static Companion: com.pusher.pushnotifications.fcm.MessagingService.Companion;
					public attachBaseContext(param0: globalAndroid.content.Context): void;
					public onBind(param0: globalAndroid.content.Intent): globalAndroid.os.IBinder;
					public onNewToken(param0: string): void;
					public onMessageReceived(param0: com.google.firebase.messaging.RemoteMessage): void;
					public constructor();
					public onStartCommand(param0: globalAndroid.content.Intent, param1: number, param2: number): number;
					public static setOnMessageReceivedListenerForVisibleActivity(param0: globalAndroid.app.Activity, param1: com.pusher.pushnotifications.PushNotificationReceivedListener): void;
				}
				export module MessagingService {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.fcm.MessagingService.Companion>;
						public setOnMessageReceivedListenerForVisibleActivity(param0: globalAndroid.app.Activity, param1: com.pusher.pushnotifications.PushNotificationReceivedListener): void;
						public setOnRefreshToken(param0: kotlin.jvm.functions.Function1<any,kotlin.Unit>): void;
						public getOnRefreshToken(): kotlin.jvm.functions.Function1<string,kotlin.Unit>;
					}
					export class WrappedFirebaseMessagingService {
						public static class: java.lang.Class<com.pusher.pushnotifications.fcm.MessagingService.WrappedFirebaseMessagingService>;
						public getOnMessageReceivedHandler(): kotlin.jvm.functions.Function1<com.google.firebase.messaging.RemoteMessage,kotlin.Unit>;
						public onNewToken(param0: string): void;
						public onMessageReceived(param0: com.google.firebase.messaging.RemoteMessage): void;
						public getOnNewTokenHandler(): kotlin.jvm.functions.Function1<string,kotlin.Unit>;
						public constructor(param0: kotlin.jvm.functions.Function1<any,kotlin.Unit>, param1: kotlin.jvm.functions.Function1<any,kotlin.Unit>);
						public attachContext(param0: globalAndroid.content.Context): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module featureflags {
				export class FeatureFlag {
					public static class: java.lang.Class<com.pusher.pushnotifications.featureflags.FeatureFlag>;
					public static DELIVERY_TRACKING: com.pusher.pushnotifications.featureflags.FeatureFlag;
					public static values(): native.Array<com.pusher.pushnotifications.featureflags.FeatureFlag>;
					public constructor(param0: string, param1: number);
					public static valueOf(param0: string): com.pusher.pushnotifications.featureflags.FeatureFlag;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module featureflags {
				export class FeatureFlagManager {
					public static class: java.lang.Class<com.pusher.pushnotifications.featureflags.FeatureFlagManager>;
					public static INSTANCE: com.pusher.pushnotifications.featureflags.FeatureFlagManager;
					public isEnabled(param0: com.pusher.pushnotifications.featureflags.FeatureFlag): boolean;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class AppActivityLifecycleCallbacks {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.AppActivityLifecycleCallbacks>;
					public static Companion: com.pusher.pushnotifications.internal.AppActivityLifecycleCallbacks.Companion;
					public onActivitySaveInstanceState(param0: globalAndroid.app.Activity, param1: globalAndroid.os.Bundle): void;
					public onActivityStarted(param0: globalAndroid.app.Activity): void;
					public onActivityCreated(param0: globalAndroid.app.Activity, param1: globalAndroid.os.Bundle): void;
					public onActivityStopped(param0: globalAndroid.app.Activity): void;
					public constructor();
					public onActivityResumed(param0: globalAndroid.app.Activity): void;
					public onActivityPaused(param0: globalAndroid.app.Activity): void;
					public onActivityDestroyed(param0: globalAndroid.app.Activity): void;
				}
				export module AppActivityLifecycleCallbacks {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.internal.AppActivityLifecycleCallbacks.Companion>;
						public getCurrentActivity$pushnotifications_release(): java.lang.ref.WeakReference<globalAndroid.app.Activity>;
						public setCurrentActivity$pushnotifications_release(param0: java.lang.ref.WeakReference<globalAndroid.app.Activity>): void;
						public appInBackground(): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class ApplicationStartJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.ApplicationStartJob>;
					public equals(param0: any): boolean;
					public component1(): com.pusher.pushnotifications.api.DeviceMetadata;
					public toString(): string;
					public copy(param0: com.pusher.pushnotifications.api.DeviceMetadata): com.pusher.pushnotifications.internal.ApplicationStartJob;
					public getDeviceMetadata(): com.pusher.pushnotifications.api.DeviceMetadata;
					public constructor(param0: com.pusher.pushnotifications.api.DeviceMetadata);
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class DeviceStateStore {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.DeviceStateStore>;
					public static Companion: com.pusher.pushnotifications.internal.DeviceStateStore.Companion;
					public setFCMToken(param0: string): void;
					public setOsVersion(param0: string): void;
					public clear(): boolean;
					public setSetUserIdHasBeenCalledWith(param0: string): void;
					public setInstanceId(param0: string): void;
					public getServerConfirmedInterestsHash(): string;
					public constructor(param0: globalAndroid.content.Context);
					public getInterests(): java.util.Set<string>;
					public getSdkVersion(): string;
					public getFCMToken(): string;
					public getOsVersion(): string;
					public setServerConfirmedInterestsHash(param0: string): void;
					public getDeviceId(): string;
					public getStartJobHasBeenEnqueued(): boolean;
					public setStartJobHasBeenEnqueued(param0: boolean): void;
					public setDeviceId(param0: string): void;
					public getInstanceId(): string;
					public setInterests(param0: java.util.Set<string>): void;
					public getSetUserIdHasBeenCalledWith(): string;
					public getUserId(): string;
					public setUserId(param0: string): void;
					public setSdkVersion(param0: string): void;
				}
				export module DeviceStateStore {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.internal.DeviceStateStore.Companion>;
						public obtain$pushnotifications_release(param0: string, param1: globalAndroid.content.Context): com.pusher.pushnotifications.internal.DeviceStateStore;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class MoshiConverter<T>  extends com.squareup.tape2.ObjectQueue.Converter<any> {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.MoshiConverter<any>>;
					public toStream(param0: any, param1: java.io.OutputStream): void;
					public from(param0: native.Array<number>): any;
					public constructor(param0: com.squareup.moshi.JsonAdapter<any>);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class OldSDKDeviceStateStore {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.OldSDKDeviceStateStore>;
					public constructor(param0: globalAndroid.content.Context);
					public clientIds(): java.util.List<string>;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class PersistentJobQueue<T>  extends java.lang.Object {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.PersistentJobQueue<any>>;
					/**
					 * Constructs a new instance of the com.pusher.pushnotifications.internal.PersistentJobQueue<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						push(param0: T): void;
						peek(): T;
						pop(): void;
						clear(): void;
						asIterable(): java.lang.Iterable<T>;
					});
					public constructor();
					public peek(): T;
					public asIterable(): java.lang.Iterable<T>;
					public push(param0: T): void;
					public pop(): void;
					public clear(): void;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class PushNotificationsInitProvider {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.PushNotificationsInitProvider>;
					public query(param0: globalAndroid.net.Uri, param1: native.Array<string>, param2: string, param3: native.Array<string>, param4: string): globalAndroid.database.Cursor;
					public update(param0: globalAndroid.net.Uri, param1: globalAndroid.content.ContentValues, param2: string, param3: native.Array<string>): number;
					public constructor();
					public onCreate(): boolean;
					public getType(param0: globalAndroid.net.Uri): string;
					public delete(param0: globalAndroid.net.Uri, param1: string, param2: native.Array<string>): number;
					public insert(param0: globalAndroid.net.Uri, param1: globalAndroid.content.ContentValues): globalAndroid.net.Uri;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class RefreshTokenJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.RefreshTokenJob>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public constructor(param0: string);
					public getNewToken(): string;
					public copy(param0: string): com.pusher.pushnotifications.internal.RefreshTokenJob;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class SDKConfiguration {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.SDKConfiguration>;
					public getOverrideHostURL(): string;
					public constructor(param0: globalAndroid.content.Context);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class ServerSyncHandler {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.ServerSyncHandler>;
					public static Companion: com.pusher.pushnotifications.internal.ServerSyncHandler.Companion;
					public handleMessage(param0: globalAndroid.os.Message): void;
				}
				export module ServerSyncHandler {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.internal.ServerSyncHandler.Companion>;
						public refreshToken(param0: string): globalAndroid.os.Message;
						public setUserId(param0: string): globalAndroid.os.Message;
						public obtain$pushnotifications_release(param0: string, param1: com.pusher.pushnotifications.api.PushNotificationsAPI, param2: com.pusher.pushnotifications.internal.DeviceStateStore, param3: java.io.File, param4: kotlin.jvm.functions.Function1<any,kotlin.Unit>, param5: kotlin.jvm.functions.Function0<any>): com.pusher.pushnotifications.internal.ServerSyncHandler;
						public applicationStart(param0: com.pusher.pushnotifications.api.DeviceMetadata): globalAndroid.os.Message;
						public stop(): globalAndroid.os.Message;
						public subscribe(param0: string): globalAndroid.os.Message;
						public unsubscribe(param0: string): globalAndroid.os.Message;
						public start(param0: string, param1: java.util.List<string>): globalAndroid.os.Message;
						public setSubscriptions(param0: java.util.Set<string>): globalAndroid.os.Message;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export abstract class ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.ServerSyncJob>;
					public static Companion: com.pusher.pushnotifications.internal.ServerSyncJob.Companion;
				}
				export module ServerSyncJob {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.internal.ServerSyncJob.Companion>;
						public getJsonAdapterFactory(): com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory<com.pusher.pushnotifications.internal.ServerSyncJob>;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class ServerSyncProcessHandler {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.ServerSyncProcessHandler>;
					public handleMessage(param0: globalAndroid.os.Message): void;
					public setTokenProviderTimeoutSecs(param0: number): void;
					public getTokenProviderTimeoutSecs(): number;
					public constructor(param0: com.pusher.pushnotifications.api.PushNotificationsAPI, param1: com.pusher.pushnotifications.internal.DeviceStateStore, param2: com.pusher.pushnotifications.internal.PersistentJobQueue<com.pusher.pushnotifications.internal.ServerSyncJob>, param3: kotlin.jvm.functions.Function1<any,kotlin.Unit>, param4: kotlin.jvm.functions.Function0<any>, param5: globalAndroid.os.Looper);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class SetSubscriptionsJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.SetSubscriptionsJob>;
					public equals(param0: any): boolean;
					public getInterests(): java.util.Set<string>;
					public toString(): string;
					public constructor(param0: java.util.Set<string>);
					public copy(param0: java.util.Set<string>): com.pusher.pushnotifications.internal.SetSubscriptionsJob;
					public component1(): java.util.Set<string>;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class SetUserIdJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.SetUserIdJob>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public constructor(param0: string);
					public copy(param0: string): com.pusher.pushnotifications.internal.SetUserIdJob;
					public getUserId(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class StartJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.StartJob>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public getKnownPreviousClientIds(): java.util.List<string>;
					public component2(): java.util.List<string>;
					public constructor(param0: string, param1: java.util.List<string>);
					public copy(param0: string, param1: java.util.List<string>): com.pusher.pushnotifications.internal.StartJob;
					public getFcmToken(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class StopJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.StopJob>;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class SubscribeJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.SubscribeJob>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public copy(param0: string): com.pusher.pushnotifications.internal.SubscribeJob;
					public constructor(param0: string);
					public getInterest(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class TapeJobQueue<T>  extends com.pusher.pushnotifications.internal.PersistentJobQueue<any> {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.TapeJobQueue<any>>;
					public asIterable(): java.lang.Iterable<any>;
					public push(param0: any): void;
					public peek(): any;
					public pop(): void;
					public clear(): void;
					public constructor(param0: java.io.File, param1: com.squareup.tape2.ObjectQueue.Converter<any>);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module internal {
				export class UnsubscribeJob extends com.pusher.pushnotifications.internal.ServerSyncJob {
					public static class: java.lang.Class<com.pusher.pushnotifications.internal.UnsubscribeJob>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): string;
					public copy(param0: string): com.pusher.pushnotifications.internal.UnsubscribeJob;
					public constructor(param0: string);
					public getInterest(): string;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module logging {
				export class Logger {
					public static class: java.lang.Class<com.pusher.pushnotifications.logging.Logger>;
					public static Companion: com.pusher.pushnotifications.logging.Logger.Companion;
					public v(param0: string, param1: java.lang.Throwable): void;
					public e(param0: string, param1: java.lang.Throwable): void;
					public constructor(param0: string);
					public w(param0: string, param1: java.lang.Throwable): void;
					public d(param0: string, param1: java.lang.Throwable): void;
					public i(param0: string, param1: java.lang.Throwable): void;
				}
				export module Logger {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.logging.Logger.Companion>;
						public get(param0: kotlin.reflect.KClass<any>): com.pusher.pushnotifications.logging.Logger;
						public getLogLevel(): number;
						public setLogLevel(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export class FCMMessageReceiver {
					public static class: java.lang.Class<com.pusher.pushnotifications.reporting.FCMMessageReceiver>;
					public constructor();
					public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export class OpenNotificationActivity {
					public static class: java.lang.Class<com.pusher.pushnotifications.reporting.OpenNotificationActivity>;
					public onCreate(param0: globalAndroid.os.Bundle): void;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export class PusherMetadata {
					public static class: java.lang.Class<com.pusher.pushnotifications.reporting.PusherMetadata>;
					public equals(param0: any): boolean;
					public copy(param0: string, param1: string, param2: java.lang.Boolean, param3: java.lang.Boolean): com.pusher.pushnotifications.reporting.PusherMetadata;
					public getPublishId(): string;
					public toString(): string;
					public component1(): string;
					public getClickAction(): string;
					public component2(): string;
					public getHasData(): boolean;
					public getHasDisplayableContent(): boolean;
					public hashCode(): number;
					public constructor(param0: string, param1: string, param2: java.lang.Boolean, param3: java.lang.Boolean);
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export class ReportingJobService {
					public static class: java.lang.Class<com.pusher.pushnotifications.reporting.ReportingJobService>;
					public static Companion: com.pusher.pushnotifications.reporting.ReportingJobService.Companion;
					public onStopJob(param0: com.firebase.jobdispatcher.JobParameters): boolean;
					public constructor();
					public onStartJob(param0: com.firebase.jobdispatcher.JobParameters): boolean;
				}
				export module ReportingJobService {
					export class Companion {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.ReportingJobService.Companion>;
						public toBundle(param0: com.pusher.pushnotifications.reporting.api.ReportEvent): globalAndroid.os.Bundle;
						public fromBundle(param0: globalAndroid.os.Bundle): com.pusher.pushnotifications.reporting.api.ReportEvent;
					}
					export module Companion {
						export class WhenMappings {
							public static class: java.lang.Class<com.pusher.pushnotifications.reporting.ReportingJobService.Companion.WhenMappings>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class DeliveryEvent extends com.pusher.pushnotifications.reporting.api.ReportEvent {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.DeliveryEvent>;
						public constructor(param0: string, param1: string, param2: string, param3: number, param4: boolean, param5: boolean, param6: boolean);
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class OpenEvent extends com.pusher.pushnotifications.reporting.api.ReportEvent {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.OpenEvent>;
						public constructor(param0: string, param1: string, param2: string, param3: number);
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export abstract class ReportEvent {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.ReportEvent>;
						public getUserId(): string;
						public getHasDisplayableContent(): java.lang.Boolean;
						public getPublishId(): string;
						public getAppInBackground(): java.lang.Boolean;
						public getHasData(): java.lang.Boolean;
						public getEvent(): com.pusher.pushnotifications.reporting.api.ReportEventType;
						public getDeviceId(): string;
						public getTimestampSecs(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class ReportEventType {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.ReportEventType>;
						public static Delivery: com.pusher.pushnotifications.reporting.api.ReportEventType;
						public static Open: com.pusher.pushnotifications.reporting.api.ReportEventType;
						public static valueOf(param0: string): com.pusher.pushnotifications.reporting.api.ReportEventType;
						public constructor(param0: string, param1: number);
						public static values(): native.Array<com.pusher.pushnotifications.reporting.api.ReportEventType>;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class ReportingAPI {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.ReportingAPI>;
						public submit(param0: com.pusher.pushnotifications.reporting.api.ReportEvent, param1: com.pusher.pushnotifications.api.OperationCallbackNoArgs): void;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class ReportingService {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.ReportingService>;
						/**
						 * Constructs a new instance of the com.pusher.pushnotifications.reporting.api.ReportingService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							submit(param0: string, param1: com.pusher.pushnotifications.reporting.api.ReportEvent): retrofit2.Call<java.lang.Void>;
						});
						public constructor();
						public submit(param0: string, param1: com.pusher.pushnotifications.reporting.api.ReportEvent): retrofit2.Call<java.lang.Void>;
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module reporting {
				export module api {
					export class UnrecoverableRuntimeException {
						public static class: java.lang.Class<com.pusher.pushnotifications.reporting.api.UnrecoverableRuntimeException>;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module pusher {
		export module pushnotifications {
			export module validation {
				export class Validations {
					public static class: java.lang.Class<com.pusher.pushnotifications.validation.Validations>;
					public static INSTANCE: com.pusher.pushnotifications.validation.Validations;
					public validateApplicationIcon$pushnotifications_release(param0: globalAndroid.content.Context): void;
				}
			}
		}
	}
}

//Generics information:
//com.pusher.pushnotifications.BeamsCallback:2
//com.pusher.pushnotifications.NoopBeamsCallback:2
//com.pusher.pushnotifications.api.OperationCallback:1
//com.pusher.pushnotifications.api.RetryStrategy:1
//com.pusher.pushnotifications.api.RetryStrategy.JustDont:1
//com.pusher.pushnotifications.api.RetryStrategy.WithInfiniteExpBackOff:1
//com.pusher.pushnotifications.internal.MoshiConverter:1
//com.pusher.pushnotifications.internal.PersistentJobQueue:1
//com.pusher.pushnotifications.internal.TapeJobQueue:1


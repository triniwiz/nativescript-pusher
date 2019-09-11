
declare class AuthData extends NSObject {

	static alloc(): AuthData; // inherited from NSObject

	static new(): AuthData; // inherited from NSObject

	constructor(o: { headers: NSDictionary<string, string>; queryParams: NSDictionary<string, string>; });

	initWithHeadersQueryParams(headers: NSDictionary<string, string>, queryParams: NSDictionary<string, string>): this;
}

declare class BeamsTokenProvider extends NSObject implements TokenProvider {

	static alloc(): BeamsTokenProvider; // inherited from NSObject

	static new(): BeamsTokenProvider; // inherited from NSObject

	constructor(o: { authURL: string; getAuthData: () => AuthData; });

	fetchTokenWithUserIdErrorCompletionHandler(userId: string, error: interop.Pointer | interop.Reference<NSError>, completion: (p1: string, p2: NSError) => void): boolean;

	initWithAuthURLGetAuthData(authURL: string, getAuthData: () => AuthData): this;
}

interface InterestsChangedDelegate {

	interestsSetOnDeviceDidChangeWithInterests(interests: NSArray<string> | string[]): void;
}
declare var InterestsChangedDelegate: {

	prototype: InterestsChangedDelegate;
};

declare class PushNotifications extends NSObject {

	static alloc(): PushNotifications; // inherited from NSObject

	static new(): PushNotifications; // inherited from NSObject

	static readonly shared: PushNotifications;

	addDeviceInterestWithInterestError(interest: string): boolean;

	clearAllStateWithCompletion(completion: () => void): void;

	clearDeviceInterestsAndReturnError(): boolean;

	getDeviceInterests(): NSArray<string>;

	handleNotificationWithUserInfo(userInfo: NSDictionary<any, any>): RemoteNotificationType;

	registerDeviceToken(deviceToken: NSData): void;

	registerForRemoteNotifications(): void;

	registerForRemoteNotificationsWithOptions(options: UNAuthorizationOptions): void;

	removeDeviceInterestWithInterestError(interest: string): boolean;

	setDeviceInterestsWithInterestsError(interests: NSArray<string> | string[]): boolean;

	setUserIdTokenProviderCompletion(userId: string, tokenProvider: TokenProvider, completion: (p1: NSError) => void): void;

	startWithInstanceId(instanceId: string): void;

	stopWithCompletion(completion: () => void): void;
}

declare var PushNotificationsVersionNumber: number;

declare var PushNotificationsVersionString: interop.Reference<number>;

declare const enum RemoteNotificationType {

	ShouldIgnore = 0,

	ShouldProcess = 1
}

interface TokenProvider {

	fetchTokenWithUserIdErrorCompletionHandler(userId: string, error: interop.Pointer | interop.Reference<NSError>, completion: (p1: string, p2: NSError) => void): boolean;
}
declare var TokenProvider: {

	prototype: TokenProvider;
};

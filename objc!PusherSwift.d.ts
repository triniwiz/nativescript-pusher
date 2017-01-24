
interface AuthRequestBuilderProtocol {

	requestForSocketIDChannel?(socketID: string, channel: PusherChannel): NSMutableURLRequest;

	requestForSocketIDChannelName?(socketID: string, channelName: string): NSURLRequest;
}
declare var AuthRequestBuilderProtocol: {

	prototype: AuthRequestBuilderProtocol;
};

declare const enum ConnectionState {

	Connecting = 0,

	Connected = 1,

	Disconnecting = 2,

	Disconnected = 3,

	Reconnecting = 4,

	ReconnectingWhenNetworkBecomesReachable = 5
}

declare class GlobalChannel extends PusherChannel {

	static alloc(): GlobalChannel; // inherited from NSObject

	static new(): GlobalChannel; // inherited from NSObject
}

declare class NativePusher extends NSObject {

	static alloc(): NativePusher; // inherited from NSObject

	static new(): NativePusher; // inherited from NSObject

	URLSession: NSURLSession;

	registerWithDeviceToken(deviceToken: NSData): void;

	setPusherAppKeyWithPusherAppKey(pusherAppKey: string): void;

	subscribeWithInterestName(interestName: string): void;

	unsubscribeWithInterestName(interestName: string): void;
}

declare class OCAuthMethod extends NSObject {

	static alloc(): OCAuthMethod; // inherited from NSObject

	static new(): OCAuthMethod; // inherited from NSObject

	constructor(o: { authEndpoint: string; });

	constructor(o: { authRequestBuilder: AuthRequestBuilderProtocol; });

	constructor(o: { secret: string; });

	constructor(o: { type: number; });

	initWithAuthEndpoint(authEndpoint: string): this;

	initWithAuthRequestBuilder(authRequestBuilder: AuthRequestBuilderProtocol): this;

	initWithSecret(secret: string): this;

	initWithType(type: number): this;
}

declare class OCPusherHost extends NSObject {

	static alloc(): OCPusherHost; // inherited from NSObject

	static new(): OCPusherHost; // inherited from NSObject

	constructor(o: { cluster: string; });

	constructor(o: { host: string; });

	initWithCluster(cluster: string): this;

	initWithHost(host: string): this;
}

declare class Pusher extends NSObject {

	static alloc(): Pusher; // inherited from NSObject

	static new(): Pusher; // inherited from NSObject

	readonly connection: PusherConnection;

	delegate: PusherDelegate;

	readonly nativePusher: NativePusher;

	constructor(o: { appKey: string; options: PusherClientOptions; });

	constructor(o: { key: string; });

	constructor(o: { key: string; options: PusherClientOptions; nativePusher: NativePusher; });

	bind(callback: (p1: any) => void): string;

	connect(): void;

	disconnect(): void;

	initWithAppKeyOptions(key: string, options: PusherClientOptions): this;

	initWithKey(key: string): this;

	initWithKeyOptionsNativePusher(key: string, options: PusherClientOptions, nativePusher: NativePusher): this;

	subscribeOnMemberAddedOnMemberRemoved(channelName: string, onMemberAdded: (p1: PusherPresenceChannelMember) => void, onMemberRemoved: (p1: PusherPresenceChannelMember) => void): PusherChannel;

	subscribeToPresenceChannelWithChannelName(channelName: string): PusherPresenceChannel;

	subscribeToPresenceChannelWithChannelNameOnMemberAddedOnMemberRemoved(channelName: string, onMemberAdded: (p1: PusherPresenceChannelMember) => void, onMemberRemoved: (p1: PusherPresenceChannelMember) => void): PusherPresenceChannel;

	subscribeWithChannelName(channelName: string): PusherChannel;

	unbindAll(): void;

	unbindWithCallbackId(callbackId: string): void;

	unsubscribe(channelName: string): void;
}

declare class PusherChannel extends NSObject {

	static alloc(): PusherChannel; // inherited from NSObject

	static new(): PusherChannel; // inherited from NSObject

	connection: PusherConnection;

	readonly name: string;

	subscribed: boolean;

	constructor(o: { name: string; connection: PusherConnection; });

	bindWithEventNameCallback(eventName: string, callback: (p1: any) => void): string;

	handleEventWithNameData(name: string, data: string): void;

	initWithNameConnection(name: string, connection: PusherConnection): this;

	triggerWithEventNameData(eventName: string, data: any): void;

	unbindAll(): void;

	unbindAllForEventName(eventName: string): void;

	unbindWithEventNameCallbackId(eventName: string, callbackId: string): void;
}

declare class PusherChannels extends NSObject {

	static alloc(): PusherChannels; // inherited from NSObject

	static new(): PusherChannels; // inherited from NSObject

	channels: NSDictionary<string, PusherChannel>;

	findPresenceWithName(name: string): PusherPresenceChannel;

	findWithName(name: string): PusherChannel;
}

declare class PusherClientOptions extends NSObject {

	static alloc(): PusherClientOptions; // inherited from NSObject

	static new(): PusherClientOptions; // inherited from NSObject

	readonly attemptToReturnJSONObject: boolean;

	readonly autoReconnect: boolean;

	readonly encrypted: boolean;

	readonly host: string;

	readonly port: number;

	constructor(o: { authMethod: OCAuthMethod; });

	constructor(o: { ocAuthMethod: OCAuthMethod; attemptToReturnJSONObject: boolean; autoReconnect: boolean; ocHost: OCPusherHost; port: number; encrypted: boolean; });

	initWithAuthMethod(authMethod: OCAuthMethod): this;

	initWithOcAuthMethodAttemptToReturnJSONObjectAutoReconnectOcHostPortEncrypted(authMethod: OCAuthMethod, attemptToReturnJSONObject: boolean, autoReconnect: boolean, host: OCPusherHost, port: number, encrypted: boolean): this;

	setAuthMethodWithAuthMethod(authMethod: OCAuthMethod): void;
}

declare class PusherConnection extends NSObject {

	static alloc(): PusherConnection; // inherited from NSObject

	static new(): PusherConnection; // inherited from NSObject

	URLSession: NSURLSession;

	channels: PusherChannels;

	connectionEstablishedMessageReceived: boolean;

	connectionState: ConnectionState;

	delegate: PusherDelegate;

	globalChannel: GlobalChannel;

	readonly key: string;

	options: PusherClientOptions;

	reconnectAttempts: number;

	socket: WebSocket;

	socketConnected: boolean;

	socketId: string;

	readonly url: string;

	userDataFetcher: () => PusherPresenceChannelMember;

	constructor(o: { key: string; socket: WebSocket; url: string; options: PusherClientOptions; URLSession: NSURLSession; });

	connect(): void;

	disconnect(): void;

	getEventDataJSONFrom(string: string): any;

	getPusherEventJSONFrom(string: string): NSDictionary<string, any>;

	handleEventWithEventNameJsonObject(eventName: string, jsonObject: NSDictionary<string, any>): void;

	initWithKeySocketUrlOptionsURLSession(key: string, socket: WebSocket, url: string, options: PusherClientOptions, URLSession: NSURLSession): this;

	sendEventWithEventDataChannel(event: string, data: any, channel: PusherChannel): void;

	websocketDidConnectWithSocket(ws: WebSocket): void;

	websocketDidDisconnectWithSocketError(ws: WebSocket, error: NSError): void;

	websocketDidReceiveDataWithSocketData(ws: WebSocket, data: NSData): void;

	websocketDidReceiveMessageWithSocketText(ws: WebSocket, text: string): void;
}

interface PusherDelegate {

	changedConnectionStateFromTo?(old: ConnectionState, new_: ConnectionState): void;

	debugLogWithMessage?(message: string): void;

	failedToSubscribeToChannelWithNameResponseDataError?(name: string, response: NSURLResponse, data: string, error: NSError): void;

	registeredForPushNotificationsWithClientId?(clientId: string): void;

	subscribedToChannelWithName?(name: string): void;

	subscribedToInterestWithName?(name: string): void;

	unsubscribedFromInterestWithName?(name: string): void;
}
declare var PusherDelegate: {

	prototype: PusherDelegate;
};

declare class PusherPresenceChannel extends PusherChannel {

	static alloc(): PusherPresenceChannel; // inherited from NSObject

	static new(): PusherPresenceChannel; // inherited from NSObject

	members: NSArray<PusherPresenceChannelMember>;

	myId: string;

	onMemberAdded: (p1: PusherPresenceChannelMember) => void;

	onMemberRemoved: (p1: PusherPresenceChannelMember) => void;

	findMemberWithUserId(userId: string): PusherPresenceChannelMember;

	me(): PusherPresenceChannelMember;
}

declare class PusherPresenceChannelMember extends NSObject {

	static alloc(): PusherPresenceChannelMember; // inherited from NSObject

	static new(): PusherPresenceChannelMember; // inherited from NSObject

	readonly userId: string;

	readonly userInfo: any;

	constructor(o: { userId: string; userInfo: any; });

	initWithUserIdUserInfo(userId: string, userInfo: any): this;
}

declare var PusherSwiftVersionNumber: number;

declare var PusherSwiftVersionString: interop.Reference<number>;

declare class WebSocket extends NSObject implements NSStreamDelegate {

	static alloc(): WebSocket; // inherited from NSObject

	static new(): WebSocket; // inherited from NSObject

	readonly currentURL: NSURL;

	disableSSLCertValidation: boolean;

	enabledSSLCipherSuites: NSArray<number>;

	headers: NSDictionary<string, string>;

	readonly isConnected: boolean;

	onConnect: () => void;

	onData: (p1: NSData) => void;

	onDisconnect: (p1: NSError) => void;

	onPong: (p1: NSData) => void;

	onText: (p1: string) => void;

	origin: string;

	timeout: number;

	voipEnabled: boolean;

	static readonly ErrorDomain: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { url: NSURL; protocols: NSArray<string>; });

	constructor(o: { url: NSURL; writeQueueQOS: NSQualityOfService; protocols: NSArray<string>; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	connect(): void;

	initWithUrlProtocols(url: NSURL, protocols: NSArray<string>): this;

	initWithUrlWriteQueueQOSProtocols(url: NSURL, writeQueueQOS: NSQualityOfService, protocols: NSArray<string>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	streamHandleEvent(aStream: NSStream, eventCode: NSStreamEvent): void;

	writeWithDataCompletion(data: NSData, completion: () => void): void;

	writeWithPingCompletion(ping: NSData, completion: () => void): void;

	writeWithStringCompletion(string: string, completion: () => void): void;
}

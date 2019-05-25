interface PTEventListener extends NSObjectProtocol {
  dispatchEvent(event: PTPusherEvent): void;

  invalidate?(): void;
}
declare var PTEventListener: {
  prototype: PTEventListener;
};

declare class PTPusher extends NSObject
  implements PTPusherConnectionDelegate, PTPusherEventBindings {
  static alloc(): PTPusher; // inherited from NSObject

  static new(): PTPusher; // inherited from NSObject

  static pusherWithKeyDelegate(
    key: string,
    delegate: PTPusherDelegate
  ): PTPusher;

  static pusherWithKeyDelegateEncrypted(
    key: string,
    delegate: PTPusherDelegate,
    isEncrypted: boolean
  ): PTPusher;

  static pusherWithKeyDelegateEncryptedCluster(
    key: string,
    delegate: PTPusherDelegate,
    isEncrypted: boolean,
    cluster: string
  ): PTPusher;

  authorizationURL: NSURL;

  channelAuthorizationDelegate: PTPusherChannelAuthorizationDelegate;

  readonly connection: PTPusherConnection;

  delegate: PTPusherDelegate;

  reconnectDelay: number;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  constructor(o: { connection: PTPusherConnection });

  bindToEventNamedHandleWithBlock(
    eventName: string,
    block: (p1: PTPusherEvent) => void
  ): PTPusherEventBinding;

  bindToEventNamedHandleWithBlockQueue(
    eventName: string,
    block: (p1: PTPusherEvent) => void,
    queue: NSObject
  ): PTPusherEventBinding;

  bindToEventNamedTargetAction(
    eventName: string,
    target: any,
    selector: string
  ): PTPusherEventBinding;

  channelNamed(name: string): PTPusherChannel;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  connect(): void;

  disconnect(): void;

  initWithConnection(connection: PTPusherConnection): this;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  pusherConnectionDidConnect(connection: PTPusherConnection): void;

  pusherConnectionDidDisconnectWithCodeReasonWasClean(
    connection: PTPusherConnection,
    errorCode: number,
    reason: string,
    wasClean: boolean
  ): void;

  pusherConnectionDidFailWithErrorWasConnected(
    connection: PTPusherConnection,
    error: NSError,
    wasConnected: boolean
  ): void;

  pusherConnectionDidReceiveEvent(
    connection: PTPusherConnection,
    event: PTPusherEvent
  ): void;

  pusherConnectionWillConnect(connection: PTPusherConnection): boolean;

  removeAllBindings(): void;

  removeBinding(binding: PTPusherEventBinding): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  sendEventNamedDataChannel(name: string, data: any, channelName: string): void;

  subscribeToChannelNamed(name: string): PTPusherChannel;

  subscribeToPresenceChannelNamed(name: string): PTPusherPresenceChannel;

  subscribeToPresenceChannelNamedDelegate(
    name: string,
    presenceDelegate: PTPusherPresenceChannelDelegate
  ): PTPusherPresenceChannel;

  subscribeToPrivateChannelNamed(name: string): PTPusherPrivateChannel;

  subscribedChannels(): NSDictionary<any, any>;

  unsubscribeAllChannels(): void;
}

declare class PTPusherAPI extends NSObject {
  static alloc(): PTPusherAPI; // inherited from NSObject

  static new(): PTPusherAPI; // inherited from NSObject

  constructor(o: { key: string; appID: string; secretKey: string });

  initWithKeyAppIDSecretKey(
    aKey: string,
    anAppID: string,
    aSecretKey: string
  ): this;

  triggerEventOnChannelDataSocketID(
    eventName: string,
    channelName: string,
    eventData: any,
    socketID: string
  ): void;
}

declare class PTPusherChannel extends NSObject
  implements PTEventListener, PTPusherEventBindings {
  static alloc(): PTPusherChannel; // inherited from NSObject

  static channelWithNamePusher(name: string, pusher: PTPusher): PTPusherChannel;

  static new(): PTPusherChannel; // inherited from NSObject

  readonly isPresence: boolean;

  readonly isPrivate: boolean;

  readonly name: string;

  readonly subscribed: boolean;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  constructor(o: { name: string; pusher: PTPusher });

  bindToEventNamedHandleWithBlock(
    eventName: string,
    block: (p1: PTPusherEvent) => void
  ): PTPusherEventBinding;

  bindToEventNamedHandleWithBlockQueue(
    eventName: string,
    block: (p1: PTPusherEvent) => void,
    queue: NSObject
  ): PTPusherEventBinding;

  bindToEventNamedTargetAction(
    eventName: string,
    target: any,
    selector: string
  ): PTPusherEventBinding;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  dispatchEvent(event: PTPusherEvent): void;

  initWithNamePusher(channelName: string, pusher: PTPusher): this;

  invalidate(): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  removeAllBindings(): void;

  removeBinding(binding: PTPusherEventBinding): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  unsubscribe(): void;
}

interface PTPusherChannelAuthorizationDelegate extends NSObjectProtocol {
  pusherChannelRequiresAuthorizationForSocketIDCompletionHandler(
    channel: PTPusherChannel,
    socketID: string,
    completionHandler: (
      p1: boolean,
      p2: NSDictionary<any, any>,
      p3: NSError
    ) => void
  ): void;
}
declare var PTPusherChannelAuthorizationDelegate: {
  prototype: PTPusherChannelAuthorizationDelegate;
};

declare const enum PTPusherChannelAuthorizationError {
  ConnectionError = 100,

  BadResponseError = 101
}

declare class PTPusherChannelAuthorizationOperation extends PTURLRequestOperation {
  static alloc(): PTPusherChannelAuthorizationOperation; // inherited from NSObject

  static new(): PTPusherChannelAuthorizationOperation; // inherited from NSObject

  static operationWithAuthorizationURLChannelNameSocketID(
    URL: NSURL,
    channelName: string,
    socketID: string
  ): any;

  readonly authorizationData: NSDictionary<any, any>;

  readonly authorized: boolean;

  completionHandler: (p1: PTPusherChannelAuthorizationOperation) => void;

  customRequestParameters: NSDictionary<any, any>;

  readonly error: NSError;

  readonly mutableURLRequest: NSMutableURLRequest;
}

declare var PTPusherChannelKey: string;

declare class PTPusherChannelMember extends NSObject {
  static alloc(): PTPusherChannelMember; // inherited from NSObject

  static new(): PTPusherChannelMember; // inherited from NSObject

  readonly userID: string;

  readonly userInfo: NSDictionary<any, any>;

  objectForKeyedSubscript(key: any): any;
}

declare class PTPusherChannelMembers extends NSObject {
  static alloc(): PTPusherChannelMembers; // inherited from NSObject

  static new(): PTPusherChannelMembers; // inherited from NSObject

  readonly count: number;

  readonly me: PTPusherChannelMember;

  readonly myID: string;

  enumerateObjectsUsingBlock(
    block: (p1: any, p2: interop.Pointer | interop.Reference<boolean>) => void
  ): void;

  memberWithID(userID: string): PTPusherChannelMember;

  objectForKeyedSubscript(key: any): any;
}

declare class PTPusherChannelServerBasedAuthorization extends NSObject
  implements PTPusherChannelAuthorizationDelegate {
  static alloc(): PTPusherChannelServerBasedAuthorization; // inherited from NSObject

  static new(): PTPusherChannelServerBasedAuthorization; // inherited from NSObject

  readonly authorizationURL: NSURL;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  constructor(o: { authorizationURL: NSURL });

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  customizeOperationsWithBlock(
    requestBlock: (
      p1: PTPusherChannelAuthorizationOperation,
      p2: PTPusherChannel
    ) => void
  ): void;

  initWithAuthorizationURL(URL: NSURL): this;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  pusherChannelRequiresAuthorizationForSocketIDCompletionHandler(
    channel: PTPusherChannel,
    socketID: string,
    completionHandler: (
      p1: boolean,
      p2: NSDictionary<any, any>,
      p3: NSError
    ) => void
  ): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}

declare class PTPusherConnection extends NSObject {
  static alloc(): PTPusherConnection; // inherited from NSObject

  static new(): PTPusherConnection; // inherited from NSObject

  readonly URL: NSURL;

  activityTimeout: number;

  readonly connected: boolean;

  delegate: PTPusherConnectionDelegate;

  pongTimeout: number;

  readonly socketID: string;

  constructor(o: { URL: NSURL });

  connect(): void;

  disconnect(): void;

  initWithURL(aURL: NSURL): this;

  send(object: any): void;
}

interface PTPusherConnectionDelegate extends NSObjectProtocol {
  pusherConnectionDidConnect(connection: PTPusherConnection): void;

  pusherConnectionDidDisconnectWithCodeReasonWasClean(
    connection: PTPusherConnection,
    errorCode: number,
    reason: string,
    wasClean: boolean
  ): void;

  pusherConnectionDidFailWithErrorWasConnected(
    connection: PTPusherConnection,
    error: NSError,
    wasConnected: boolean
  ): void;

  pusherConnectionDidReceiveEvent(
    connection: PTPusherConnection,
    event: PTPusherEvent
  ): void;

  pusherConnectionWillConnect(connection: PTPusherConnection): boolean;
}
declare var PTPusherConnectionDelegate: {
  prototype: PTPusherConnectionDelegate;
};

declare var PTPusherConnectionEstablishedEvent: string;

declare var PTPusherConnectionPingEvent: string;

declare const enum PTPusherConnectionState {
  Disconnecting = 0,

  Disconnected = 1,

  Connecting = 2,

  AwaitingHandshake = 3,

  Connected = 4
}

declare var PTPusherDataKey: string;

interface PTPusherDelegate extends NSObjectProtocol {
  pusherConnectionDidConnect?(
    pusher: PTPusher,
    connection: PTPusherConnection
  ): void;

  pusherConnectionDidDisconnectWithErrorWillAttemptReconnect?(
    pusher: PTPusher,
    connection: PTPusherConnection,
    error: NSError,
    willAttemptReconnect: boolean
  ): void;

  pusherConnectionFailedWithError?(
    pusher: PTPusher,
    connection: PTPusherConnection,
    error: NSError
  ): void;

  pusherConnectionWillAutomaticallyReconnectAfterDelay?(
    pusher: PTPusher,
    connection: PTPusherConnection,
    delay: number
  ): boolean;

  pusherConnectionWillConnect?(
    pusher: PTPusher,
    connection: PTPusherConnection
  ): boolean;

  pusherDidFailToSubscribeToChannelWithError?(
    pusher: PTPusher,
    channel: PTPusherChannel,
    error: NSError
  ): void;

  pusherDidReceiveErrorEvent?(
    pusher: PTPusher,
    errorEvent: PTPusherErrorEvent
  ): void;

  pusherDidSubscribeToChannel?(
    pusher: PTPusher,
    channel: PTPusherChannel
  ): void;

  pusherDidUnsubscribeFromChannel?(
    pusher: PTPusher,
    channel: PTPusherChannel
  ): void;

  pusherWillAuthorizeChannelWithAuthOperation?(
    pusher: PTPusher,
    channel: PTPusherChannel,
    operation: PTPusherChannelAuthorizationOperation
  ): void;
}
declare var PTPusherDelegate: {
  prototype: PTPusherDelegate;
};

declare var PTPusherErrorDomain: string;

declare class PTPusherErrorEvent extends PTPusherEvent {
  static alloc(): PTPusherErrorEvent; // inherited from NSObject

  static eventFromMessageDictionary(
    dictionary: NSDictionary<any, any>
  ): PTPusherErrorEvent; // inherited from PTPusherEvent

  static new(): PTPusherErrorEvent; // inherited from NSObject

  readonly code: number;

  readonly message: string;
}

declare var PTPusherErrorUnderlyingEventKey: string;

declare class PTPusherEvent extends NSObject {
  static alloc(): PTPusherEvent; // inherited from NSObject

  static eventFromMessageDictionary(
    dictionary: NSDictionary<any, any>
  ): PTPusherEvent;

  static new(): PTPusherEvent; // inherited from NSObject

  readonly channel: string;

  readonly data: any;

  readonly name: string;

  readonly timeReceived: Date;

  constructor(o: { eventName: string; channel: string; data: any });

  initWithEventNameChannelData(name: string, channel: string, data: any): this;
}

declare class PTPusherEventBinding extends NSObject implements PTEventListener {
  static alloc(): PTPusherEventBinding; // inherited from NSObject

  static new(): PTPusherEventBinding; // inherited from NSObject

  readonly eventName: string;

  readonly valid: boolean;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  constructor(o: { eventListener: PTEventListener; eventName: string });

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  dispatchEvent(event: PTPusherEvent): void;

  initWithEventListenerEventName(
    eventListener: PTEventListener,
    eventName: string
  ): this;

  invalidate(): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}

interface PTPusherEventBindings extends NSObjectProtocol {
  bindToEventNamedHandleWithBlock(
    eventName: string,
    block: (p1: PTPusherEvent) => void
  ): PTPusherEventBinding;

  bindToEventNamedHandleWithBlockQueue(
    eventName: string,
    block: (p1: PTPusherEvent) => void,
    queue: NSObject
  ): PTPusherEventBinding;

  bindToEventNamedTargetAction(
    eventName: string,
    target: any,
    selector: string
  ): PTPusherEventBinding;

  removeAllBindings(): void;

  removeBinding(binding: PTPusherEventBinding): void;
}
declare var PTPusherEventBindings: {
  prototype: PTPusherEventBindings;
};

declare class PTPusherEventDispatcher extends NSObject
  implements PTEventListener {
  static alloc(): PTPusherEventDispatcher; // inherited from NSObject

  static new(): PTPusherEventDispatcher; // inherited from NSObject

  readonly bindings: NSDictionary<any, any>;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  addEventListenerForEventNamed(
    listener: PTEventListener,
    eventName: string
  ): PTPusherEventBinding;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  dispatchEvent(event: PTPusherEvent): void;

  invalidate(): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  removeAllBindings(): void;

  removeBinding(binding: PTPusherEventBinding): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}

declare var PTPusherEventKey: string;

declare var PTPusherEventReceivedNotification: string;

declare var PTPusherEventUserInfoKey: string;

declare var PTPusherFatalErrorDomain: string;

declare class PTPusherMockConnection extends PTPusherConnection {
  static alloc(): PTPusherMockConnection; // inherited from NSObject

  static new(): PTPusherMockConnection; // inherited from NSObject

  disconnectionCode: number;

  readonly sentClientEvents: NSArray<any>;

  simulateServerEventNamedData(name: string, data: any): void;

  simulateServerEventNamedDataChannel(
    name: string,
    data: any,
    channelName: string
  ): void;

  simulateUnexpectedDisconnection(): void;
}

declare class PTPusherPresenceChannel extends PTPusherPrivateChannel {
  static alloc(): PTPusherPresenceChannel; // inherited from NSObject

  static channelWithNamePusher(
    name: string,
    pusher: PTPusher
  ): PTPusherPresenceChannel; // inherited from PTPusherChannel

  static new(): PTPusherPresenceChannel; // inherited from NSObject

  readonly members: PTPusherChannelMembers;

  presenceDelegate: PTPusherPresenceChannelDelegate;
}

interface PTPusherPresenceChannelDelegate extends NSObjectProtocol {
  presenceChannelDidSubscribe(channel: PTPusherPresenceChannel): void;

  presenceChannelMemberAdded(
    channel: PTPusherPresenceChannel,
    member: PTPusherChannelMember
  ): void;

  presenceChannelMemberRemoved(
    channel: PTPusherPresenceChannel,
    member: PTPusherChannelMember
  ): void;
}
declare var PTPusherPresenceChannelDelegate: {
  prototype: PTPusherPresenceChannelDelegate;
};

declare class PTPusherPrivateChannel extends PTPusherChannel {
  static alloc(): PTPusherPrivateChannel; // inherited from NSObject

  static channelWithNamePusher(
    name: string,
    pusher: PTPusher
  ): PTPusherPrivateChannel; // inherited from PTPusherChannel

  static new(): PTPusherPrivateChannel; // inherited from NSObject

  triggerEventNamedData(eventName: string, eventData: any): void;
}

declare const enum PTPusherServerErrorCodes {
  ErrorUnknown = -1,

  ErrorSSLRequired = 4000,

  ErrorApplicationUnknown = 4001,

  ErrorApplicationDisabled = 4002
}

declare const PTPusherSubscriptionError: number;

declare const PTPusherSubscriptionUnknownAuthorisationError: number;

declare class PTURLRequestOperation extends NSOperation
  implements NSURLSessionDataDelegate, NSURLSessionDelegate {
  static alloc(): PTURLRequestOperation; // inherited from NSObject

  static new(): PTURLRequestOperation; // inherited from NSObject

  URLRequest: NSURLRequest;

  readonly URLResponse: NSURLResponse;

  readonly URLSession: NSURLSession;

  readonly connectionError: NSError;

  readonly responseData: NSData;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  constructor(o: { URLRequest: NSURLRequest });

  URLSessionDataTaskDidBecomeDownloadTask(
    session: NSURLSession,
    dataTask: NSURLSessionDataTask,
    downloadTask: NSURLSessionDownloadTask
  ): void;

  URLSessionDataTaskDidBecomeStreamTask(
    session: NSURLSession,
    dataTask: NSURLSessionDataTask,
    streamTask: NSURLSessionStreamTask
  ): void;

  URLSessionDataTaskDidReceiveData(
    session: NSURLSession,
    dataTask: NSURLSessionDataTask,
    data: NSData
  ): void;

  URLSessionDataTaskDidReceiveResponseCompletionHandler(
    session: NSURLSession,
    dataTask: NSURLSessionDataTask,
    response: NSURLResponse,
    completionHandler: (p1: NSURLSessionResponseDisposition) => void
  ): void;

  URLSessionDataTaskWillCacheResponseCompletionHandler(
    session: NSURLSession,
    dataTask: NSURLSessionDataTask,
    proposedResponse: NSCachedURLResponse,
    completionHandler: (p1: NSCachedURLResponse) => void
  ): void;

  URLSessionDidBecomeInvalidWithError(
    session: NSURLSession,
    error: NSError
  ): void;

  URLSessionDidFinishEventsForBackgroundURLSession(session: NSURLSession): void;

  URLSessionDidReceiveChallengeCompletionHandler(
    session: NSURLSession,
    challenge: NSURLAuthenticationChallenge,
    completionHandler: (
      p1: NSURLSessionAuthChallengeDisposition,
      p2: NSURLCredential
    ) => void
  ): void;

  URLSessionTaskDidCompleteWithError(
    session: NSURLSession,
    task: NSURLSessionTask,
    error: NSError
  ): void;

  URLSessionTaskDidFinishCollectingMetrics(
    session: NSURLSession,
    task: NSURLSessionTask,
    metrics: NSURLSessionTaskMetrics
  ): void;

  URLSessionTaskDidReceiveChallengeCompletionHandler(
    session: NSURLSession,
    task: NSURLSessionTask,
    challenge: NSURLAuthenticationChallenge,
    completionHandler: (
      p1: NSURLSessionAuthChallengeDisposition,
      p2: NSURLCredential
    ) => void
  ): void;

  URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend(
    session: NSURLSession,
    task: NSURLSessionTask,
    bytesSent: number,
    totalBytesSent: number,
    totalBytesExpectedToSend: number
  ): void;

  URLSessionTaskIsWaitingForConnectivity(
    session: NSURLSession,
    task: NSURLSessionTask
  ): void;

  URLSessionTaskNeedNewBodyStream(
    session: NSURLSession,
    task: NSURLSessionTask,
    completionHandler: (p1: NSInputStream) => void
  ): void;

  URLSessionTaskWillBeginDelayedRequestCompletionHandler(
    session: NSURLSession,
    task: NSURLSessionTask,
    request: NSURLRequest,
    completionHandler: (
      p1: NSURLSessionDelayedRequestDisposition,
      p2: NSURLRequest
    ) => void
  ): void;

  URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler(
    session: NSURLSession,
    task: NSURLSessionTask,
    response: NSHTTPURLResponse,
    request: NSURLRequest,
    completionHandler: (p1: NSURLRequest) => void
  ): void;

  cancelImmediately(): void;

  checkForCancellation(): void;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  finish(): void;

  initWithURLRequest(request: NSURLRequest): this;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(
    aSelector: string,
    object1: any,
    object2: any
  ): any;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}

declare var PusherVersionNumber: number;

declare var PusherVersionString: interop.Reference<number>;

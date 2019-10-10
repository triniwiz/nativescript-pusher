export declare class TNSPusherBeams {
    static _interestsCallback: any;
    static _messageCallback: any;
    static _tokenCallback: any;
    static _cachedMessage: any;
    static _registerResolveCallback: any;
    static _registerRejectCallback: any;
    private static delegate;
    private static getMessage;
    static registerForPushNotifications(): Promise<{}>;
    static unregisterForPushNotifications(): Promise<{}>;
    static start(instanceId: string): void;
    static addDeviceInterest(interest: string): void;
    static addOnInterestsChangeCallback(callback: (interests: string[]) => void): void;
    static addOnMessageReceivedCallback(callback: (message: any) => void): void;
    static addOnPushTokenReceivedCallback(callback: (token: any) => void): void;
    static getDeviceInterests(): any;
    static removeDeviceInterest(interest: string): void;
    static clearDeviceInterests(): void;
    static clearAllState(): void;
}

export declare class TNSPusherBeams {
    static _interestsCallback: any;
    static _messageCallback: any;
    static start(instanceId: string): void;
    static addDeviceInterest(interest: string): void;
    static addOnInterestsChangeCallback(callback: (interests: string[]) => void): void;
    static addOnMessageReceivedCallback(callback: (message: any) => void): void;
    static addOnPushTokenReceivedCallback(callback: (token: any) => void): void;
    static getDeviceInterests(): any[];
    static removeDeviceInterest(interest: string): void;
    static clearDeviceInterests(): void;
    static registerForPushNotifications(): Promise<{}>;
    static unregisterForPushNotifications(): Promise<{}>;
    static clearAllState(): void;
}

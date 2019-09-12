export declare class TNSPusherBeams {
    public static start(instanceId: string);

    public static addDeviceInterest(interest: string);

    public static addOnMessageReceivedCallback(callback: (message: any) => void);

    public static getDeviceInterests(): string[]

    public static removeDeviceInterest(interest: string);

    public static clearDeviceInterests();

    public static registerForPushNotifications(): Promise<any>;

    public static unregisterForPushNotifications(): Promise<any>;

    public static addOnInterestsChangeCallback(callback: (interests: string[]) => void);

}

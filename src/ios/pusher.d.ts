export declare class Pusher {
    private _pusher;
    private _options;
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

export class Pusher {
  _pusher;
  constructor(apiKey: string, options?: Object) {
    if (options) {

    } else {
      this._pusher = new com.pusher.client.Pusher(apiKey);
    }
  }
  connect(callback?: Function) {
    this._pusher.connect();
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
    this._pusher.subscribe(channelName);
  }
  subscribePresence(channelName: string, callback?: Function) {
    this._pusher.subscribePresence(channelName);
  }
  subscribePrivate(channelName: string, callback?: Function) {
    this._pusher.subscribePrivate(channelName);
  }
  unsubscribe(channelName: string) {
    this._pusher.unsubscribe(channelName);
  }
}
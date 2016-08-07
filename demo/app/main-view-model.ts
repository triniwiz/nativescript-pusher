import {Observable} from 'data/observable';
import {Pusher} from 'nativescript-pusher';

export class HelloWorldModel extends Observable {
  public message: string;
  private pusher:Pusher;
  constructor() {
    super();
    this.pusher = new Pusher('')
  }
}
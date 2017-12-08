import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as app from 'tns-core-modules/application';
import { HelloWorldModel } from './main-view-model';
import { ConnectionStatusEvent, ConnectionStatus } from 'nativescript-pusher';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
const context = new HelloWorldModel();
let page;
// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  page = <pages.Page>args.object;
  page.bindingContext = context;
}

export function connect() {
  subscribe();
  context.pusher.connect((error, status: ConnectionStatusEvent) => {
    if (error) {
      console.log(error);
    } else {
      context.set('connectionStatus', status.current);
    }
  });
}

export function disconnect() {
  context.pusher.disconnect();
  context.set('channelName', '');
  context.set('eventName', '');
  context.set('messages', '');
}

function subscribe() {
  if (app.android) {
    context.pusher.subscribeToChannelEvent(
      'android',
      'test-android',
      (error, data) => {
        if (!error) {
          context.set('channelName', data['channelName']);
          context.set('eventName', data['eventName']);
          context.set('messages', data['data']['messages']);
        } else {
          console.log(JSON.stringify(error));
        }
      }
    );
  } else {
    context.pusher.subscribeToChannelEvent('ios', 'test-ios', (error, data) => {
      if (!error) {
        context.set('channelName', data['channelName']);
        context.set('eventName', data['eventName']);
        context.set('messages', data['data']['messages']);
      } else {
        console.log(JSON.stringify(error));
      }
    });
  }
}

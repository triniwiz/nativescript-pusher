import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as app from 'tns-core-modules/application';
import { HelloWorldModel } from './main-view-model';
const context = new HelloWorldModel();
let page;
// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  page = <pages.Page>args.object;
  page.bindingContext = context;
  context.pusher.connect();
  if (app.android) {
    context.pusher.subscribeToChannel('android', (error, data) => {
      if (!error) {
        console.log(JSON.stringify(data));
      } else {
        console.log(error);
      }
    });
    context.pusher.subscribeToChannelEvent(
      'android',
      'test-android',
      (error, data) => {
        if (!error) {
          console.log(JSON.stringify(data));
        } else {
          console.log(error);
        }
      }
    );
  } else {
    context.pusher.subscribeToChannel('ios', (error, data) => {
      if (!error) {
        console.log(JSON.stringify(data));
      } else {
        console.log(error);
      }
    });
    context.pusher.subscribeToChannelEvent('ios', 'test-ios', (error, data) => {
      if (!error) {
        console.log(JSON.stringify(data));
      } else {
        console.log(error);
      }
    });
  }
}

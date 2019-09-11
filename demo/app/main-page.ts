/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
import * as app from 'tns-core-modules/application';

let context = new HelloWorldModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = <Page>args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = context;
}


export function connect() {
    context.pusher.connection.bind('error', (error) => {
        console.dir(error);
    });

    context.pusher.connection.bind('connected', () => {
        console.log('connected');
    });

    subscribe();

    context.pusher.connect();
}

export function disconnect() {
    context.pusher.disconnect();
    context.set('channelName', '');
    context.set('eventName', '');
    context.set('messages', '');
}

let channel;

function subscribe() {
    if (app.android) {
        /*context.pusher.subscribeToChannelEvent(
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
        );*/
    } else {
        channel = context.pusher.subscribe('ios');
        const handler = (data) => {
            context.set('channelName', data['channel']);
            context.set('eventName', data['event']);
            context.set('messages', data['data']['messages']);
        };
        channel.bind('test-ios', handler);
        /*channel.bind('test-ios', (data) => {
            context.set('channelName', data['channelName']);
            context.set('eventName', data['eventName']);
            context.set('messages', data['data']['messages']);
        });
        channel.bind('error', (error) => {
            console.log('channel bind', JSON.stringify(error));
        });*/
    }
}

/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as application from 'tns-core-modules/application';
import { TNSPusherBeams } from '@nativescript-pusher/beams';

TNSPusherBeams.registerForPushNotifications().then(() => {
    console.log('registered');
}).catch(e => {
    console.log(e);
});
TNSPusherBeams.start('13813917-1427-42af-a2fa-cdfd31a7e1d0');
TNSPusherBeams.addOnInterestsChangeCallback(interests => {
    console.log('interests', interests);
});
application.on('launch', args => {
    TNSPusherBeams.addDeviceInterest('debug-hello');
    TNSPusherBeams.addDeviceInterest('hello');
    console.log(TNSPusherBeams.getDeviceInterests());
    TNSPusherBeams.clearDeviceInterests();
    setTimeout(() => {
        TNSPusherBeams.addDeviceInterest('debug-hello');
        TNSPusherBeams.addDeviceInterest('hello');
        TNSPusherBeams.addDeviceInterest('osei');
    }, 5000);
    TNSPusherBeams.addOnMessageReceivedCallback(message => {
        console.log('message', message);
    });
});
application.run({moduleName: 'app-root'});

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/

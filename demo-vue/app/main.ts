import Vue from 'nativescript-vue';
import * as application from 'tns-core-modules/application';
import App from './components/App';
import { TNSPusherBeams } from '@nativescript-pusher/beams';
TNSPusherBeams.registerForPushNotifications()
  .then(() => {
    console.log('registered');
  })
  .catch(e => {
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

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

new Vue({
  render: h => h('frame', [h(App)])
}).$start();

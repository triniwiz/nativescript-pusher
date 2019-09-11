import Vue from 'nativescript-vue'
import App from './components/App'
import { PusherBeams } from '@nativescript-pusher/beams';
PusherBeams.start('13813917-1427-42af-a2fa-cdfd31a7e1d0');
PusherBeams.addDeviceInterest("hello");
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({

  render: h => h('frame', [h(App)])
}).$start()

<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="1*,2*">
          <GridLayout row="0" columns="*" rows="1*,2*">
            <Label row="0" class="title" :text="`Pusher Beams`"/>
            <StackLayout row="1" horizontalAlignment="left">
              <Label class="message" :text="`Title: ${computedTitle}`" />
              <Label class="message" :text="`Message: ${computedMessage}`" />
            </StackLayout>
          </GridLayout>
          <!-- <GridLayout row="1" columns="*" rows="1*,2*">
            <Label row="0" class="title" :text="`Pusher Channels`"/>
            <StackLayout row="1" horizontalAlignment="left">
              <Button @tap="connect" text="Connect" />
              <Label :text="`Connection Status ${connectionStatus}`" class="message"/>
              <Label :text="`Channel Name ${channelName}   : Event Name ${eventName}`" class="message"/>
              <Button @tap="disconnect" text="Disconnect"/>
              <ListView items="{{messages}}" height="100%">
              <ListView.itemTemplate>
              <Label text="{{ text }}" class="message" textWrap="true"/>
              </ListView.itemTemplate>
              </ListView>
            </StackLayout>
          </GridLayout> -->
        </GridLayout>
    </Page>
</template>

<script lang="ts">
  import * as app from 'tns-core-modules/application';
  import { TNSPusherBeams } from '@nativescript-pusher/beams';
  // import { TNSPusher, ConnectionStatusEvent, ConnectionStatus } from '@nativescript-pusher/channels';

  // const pusher = new TNSPusher(
  //   '08e36d57b01061a58520', {
  //     cluster: 'us2',
  //     encrypted: true
  //   });

  export default {
    data() {
      return {
        title: '',
        message: '',
        connectionStatus: '',
        channelName: '',
        eventName: ''
      }
    },
    created() {
      TNSPusherBeams.addOnMessageReceivedCallback(message => {
          console.log('message', message);
          this.title = message.title;
          this.message = message.body;
      });

    },
    methods: {

    // connect() {
    //   this.subscribe();
    //   pusher.connect((error, status: ConnectionStatusEvent) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       this.connectionStatus = status.current;
    //     }
    //   });
    // },
    // disconnect() {
    //   pusher.disconnect();
    //   this.channelName = '';
    //   this.eventName = '';
    //   this.messages = '';
    // },
    //   subscribe() {
    //     if (app.android) {
    //       pusher.subscribeToChannelEvent(
    //         'android',
    //         'test-android',
    //         (error, data) => {
    //           if (!error) {
    //             this.channelName = data['channelName'];
    //             this.eventName = data['eventName'];
    //             this.messages = data['data']['messages'];
    //           } else {
    //             console.log(JSON.stringify(error));
    //           }
    //         }
    //       );
    //     } else {
    //       pusher.subscribeToChannelEvent('ios', 'test-ios', (error, data) => {
    //         if (!error) {
    //           this.channelName = data['channelName'];
    //           this.eventName = data['eventName'];
    //           this.messages = data['data']['messages'];
    //         } else {
    //           console.log(JSON.stringify(error));
    //         }
    //       });
    //     }
    
    },
    computed: {
      computedTitle() {
        return this.title;
      },
      computedMessage() {
        return this.message;
      }
    }
  }
</script>

<style scoped lang="scss">
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        text-align: left;
        font-size: 20;
        color: #333333;
        margin-left: 20;
    }

    .title {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
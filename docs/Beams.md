![push-beams](images/pusher-beams-logo.png "Pusher Beams Logo")


### Android


#### Push notification icon and color

Add the following service to allow processing of the push notification it has to be configured in the <application> tag in the AndroidManifest.xml

```xml
 <service android:name="com.github.triniwiz.pusher.NotificationsMessagingService">
            <intent-filter android:priority="1">
                <action android:name="com.google.firebase.MESSAGING_EVENT"/>
            </intent-filter>
  </service>
```


If you want to use a specific icon for the push notification, it has to be configured in the <application> tag in the AndroidManifest.xml

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon"
      android:resource="@drawable/your_drawable_name" />
<meta-data android:name="com.google.firebase.messaging.default_notification_color"
      android:resource="@color/ns_primary" />
```      

#### Configure FCM 
- [Setup](https://pusher.com/docs/beams/getting-started/android/configure-fcm)

### IOS

#### Enable push support in Xcode

Open /platforms/ios/yourproject.__xcworkspace__ (!) and go to your project's target and head over to "Capabilities" to switch this on (if it isn't already):
![push-xcode-config](images/push-xcode-config.png "Push Xcode config")

> Without this enabled you will receive push messages in the foreground, but **NOT in the background** / when the app is killed.

#### Copy the entitlements file
The previous step created a the file`platforms/ios/YourAppName/(Resources/)YourAppName.entitlements`.
Copy that file to `app/App_Resources/iOS/` (if it doesn't exist yet, otherwise merge its contents),
so it's not removed when you remove and re-add the iOS platform. The relevant content for background push in that file is:

```xml
	<key>aps-environment</key>
	<string>development</string>
```

#### Allow processing when a background push is received
Open `app/App_Resources/iOS/Info.plist` and add this to the bottom:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```
#### Configure APNS 
- [Setup](https://pusher.com/docs/beams/getting-started/ios/configure-apns)

### Usage
`tns plugin add @nativescript-pusher/beams'`
#### Connect to Pusher

```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.registerForPushNotifications(); // Promise
TNSPusherBeams.start("YOUR_INSTANCE_ID");
```

#### Add Device Interest

```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.addDeviceInterest("hello");
```

#### Remove Device Interest

```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.removeDeviceInterest("hello");
```


#### Get interest changes
```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.addOnInterestsChangeCallback(interests =>{
//interests string[]
})
```


#### Handling a notification

```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.addOnMessageReceivedCallback(message =>{

})
```

#### Handing push token

If you want to send push messages to individual devices, either from your own backend or the FCM console, you need the push token.

```typescript
import {TNSPusherBeams} from '@nativescript-pusher/beams';
TNSPusherBeams.addOnPushTokenReceivedCallback(token =>{

})
```

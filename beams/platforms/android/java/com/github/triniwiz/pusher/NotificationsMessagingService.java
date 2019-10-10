package com.github.triniwiz.pusher;

import java.util.Map;

import com.google.firebase.messaging.RemoteMessage;
import com.google.firebase.messaging.RemoteMessage.Notification;
import com.pusher.pushnotifications.fcm.MessagingService;

import org.json.JSONException;
import 	org.json.JSONObject;
public class NotificationsMessagingService extends MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        JSONObject  message = new JSONObject();
        try {
            message.put("from", remoteMessage.getFrom());
            Notification notification = remoteMessage.getNotification();
            if(notification != null){
                message.put("title", notification.getTitle());
                message.put("body", notification.getBody());
            }


            String delivered_priority = "unknown";
            int priority = remoteMessage.getPriority();
            switch (priority) {
                case 1:
                    delivered_priority = "high";
                    break;
                case 2:
                    delivered_priority = "normal";
                    break;
                default:
                    delivered_priority = "unknown";
            }


            String original_priority = "unknown";
            int o_priority = remoteMessage.getOriginalPriority();
            switch (o_priority) {
                case 1:
                    original_priority = "high";
                    break;
                case 2:
                    original_priority = "normal";
                    break;
                default:
                    original_priority = "unknown";
            }


            message.put("collapse_key" ,remoteMessage.getCollapseKey());
            JSONObject fcm = new JSONObject();
            fcm.put("delivered_priority",delivered_priority);
            fcm.put("original_priority",original_priority);
            fcm.put("message_id",remoteMessage.getMessageId());
            fcm.put("sent_time", remoteMessage.getSentTime());
            fcm.put("ttl", remoteMessage.getTtl());
            message.put("fcm", fcm);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        Map<String,String> data = remoteMessage.getData();
        for(String key: data.keySet()){
            if(key.equals("pusher")){
                try {
                    message.put("pusher", new JSONObject(data.get(key)));
                } catch (Exception e) {
                    try {
                        message.put("pusher", data.get(key));
                    } catch (JSONException ex) {
                        ex.printStackTrace();
                    }
                }

            }else {
                try {
                    message.put(key, data.get(key));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }


        if(BeamsPlugin.onMessageListener != null){
            BeamsPlugin.onMessageListener.onSuccess(message.toString());
        }
    }

    @Override
    public void onNewToken(String token){
        if(BeamsPlugin.onTokenListener != null){
            BeamsPlugin.onTokenListener.onSuccess(token);
        }
    }
}

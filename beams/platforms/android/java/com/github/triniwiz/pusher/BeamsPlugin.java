package com.github.triniwiz.pusher;

public class BeamsPlugin {
    static Listener onMessageListener = null;
    static Listener onTokenListener = null;

    public interface Listener {
        public void onSuccess(String data);
    }

    public static void setOnMessageListener(Listener  listener){
        BeamsPlugin.onMessageListener = listener;
    }

    public static void setOnTokenListener(Listener listener){
        BeamsPlugin.onTokenListener = listener;
    }
}

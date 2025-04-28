package com.notification.util;

import com.notification.enums.NotificationEventType;

public class NotificationUtils {

    public static String getMessage(final NotificationEventType notificationEventType) {
        switch (notificationEventType) {
            case FRIEND_REQUEST:
                return "sent a friend request";
            case FRIEND_ACCEPT:
                return "accepted your friend request";
            default:
                return "";
        }
    }
}

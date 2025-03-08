package com.chatbackend.events.notification;

import com.chatbackend.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventPublisher {
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void publishNotificationEvent(final Notification notification) {
        final NotificationEvent notificationEvent = new NotificationEvent(this, notification);
        System.out.println("publisher called");
        applicationEventPublisher.publishEvent(notificationEvent);
    }
}

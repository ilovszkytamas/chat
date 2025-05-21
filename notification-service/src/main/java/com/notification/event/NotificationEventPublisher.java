package com.notification.event;

import com.notification.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventPublisher implements EventPublisher<NotificationEvent> {
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void publishNotificationEvent(final Notification notification) {
        final NotificationEvent notificationEvent = new NotificationEvent(this, notification);
        System.out.println("publisher called");
        publishEvent(notificationEvent);
    }

    @Override
    public void publishEvent(NotificationEvent event) {
        applicationEventPublisher.publishEvent(event);
    }
}

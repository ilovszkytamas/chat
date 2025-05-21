package com.notification.event;

import com.notification.model.Notification;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Setter
@Getter
public class NotificationEvent extends ApplicationEvent {
    private Notification notification;

    public NotificationEvent(final Object source, final Notification notification) {
        super(source);
        this.notification = notification;
    }
}

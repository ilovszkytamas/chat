package com.notification.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class PresenceUpdateEventPublisher implements EventPublisher<PresenceUpdateEvent>{
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public void publishEvent(PresenceUpdateEvent event) {
        applicationEventPublisher.publishEvent(event);
    }
}

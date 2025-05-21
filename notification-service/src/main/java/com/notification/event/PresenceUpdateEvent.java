package com.notification.event;

import lombok.Value;

@Value
public class PresenceUpdateEvent {
    Long userId;
    Boolean online;
}

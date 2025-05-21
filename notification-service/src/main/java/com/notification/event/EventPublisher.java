package com.notification.event;

public interface EventPublisher<T> {
    void publishEvent(T event);
}

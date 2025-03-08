package com.chatbackend.config;

import com.chatbackend.events.notification.NotificationEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.EmitterProcessor;

@Configuration
public class NotificationProcessorConfiguration {

    @Bean
    public EmitterProcessor notificationProcessor() {
        final EmitterProcessor<NotificationEvent> processor = EmitterProcessor.create();

        return processor;
    }
}

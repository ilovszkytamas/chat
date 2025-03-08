package com.chatbackend.controller;

import com.chatbackend.dto.response.NotificationDTO;
import com.chatbackend.events.notification.NotificationEvent;
import com.chatbackend.model.Notification;
import com.chatbackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    final EmitterProcessor<NotificationEvent> processor;

    @GetMapping(path = "/{id}", produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<NotificationDTO> notificationListener(final @AuthenticationPrincipal User user, final @PathVariable Long id) {
        return processor
                .filter(notificationEvent -> notificationEvent.getNotification().getRecipient().getId() == id)
                .map(this::mapNotificationEventToNotificationDTO);
    }

    @EventListener
    private void listenToEvent(final NotificationEvent notificationEvent) {
        System.out.println("event");
        processor.sink().next(notificationEvent);
    }

    private NotificationDTO mapNotificationEventToNotificationDTO(final NotificationEvent notificationEvent) {
        final Notification notification = notificationEvent.getNotification();
        System.out.println(notification.toString());
        return NotificationDTO
                .builder()
                .senderId(notification.getSender().getId())
                .senderFullName(notification.getSender().getFullName())
                .notificationStatus(notification.getNotificationStatus())
                .build();
    }
}

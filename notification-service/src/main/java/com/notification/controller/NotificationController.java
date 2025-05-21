package com.notification.controller;

import com.notification.dto.NotificationDTO;
import com.notification.model.Notification;
import com.notification.model.User;
import com.notification.event.NotificationEvent;
import com.notification.util.NotificationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final Sinks.Many<NotificationDTO> sink = Sinks.many().multicast().onBackpressureBuffer();

    @GetMapping(path = "/{id}", produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<NotificationDTO> notificationListener(final @AuthenticationPrincipal User user, final @PathVariable Long id) {
        return sink.asFlux().filter(notificationDTO -> Objects.equals(notificationDTO.getRecipientId(), id)).delayElements(Duration.ofMillis(100));
    }

    @EventListener
    private void listenToEvent(final NotificationEvent notificationEvent) {
        sink.tryEmitNext(mapNotificationEventToNotificationDTO(notificationEvent));
    }

    private NotificationDTO mapNotificationEventToNotificationDTO(final NotificationEvent notificationEvent) {
        final Notification notification = notificationEvent.getNotification();
        return NotificationDTO
                .builder()
                .id(notification.getId())
                .senderId(notification.getSender().getId())
                .recipientId(notification.getRecipient().getId())
                .senderFullName(notification.getSender().getFullName())
                .message(NotificationUtils.getMessage(notification.getNotificationEventType()))
                .notificationStatus(notification.getNotificationStatus())
                .build();
    }

}

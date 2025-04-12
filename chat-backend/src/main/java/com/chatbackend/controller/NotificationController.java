package com.chatbackend.controller;

import com.chatbackend.dto.response.NotificationDTO;
import com.chatbackend.enums.NotificationEventType;
import com.chatbackend.enums.NotificationStatus;
import com.chatbackend.events.notification.NotificationEvent;
import com.chatbackend.model.Notification;
import com.chatbackend.model.User;
import com.chatbackend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final Sinks.Many<NotificationDTO> sink = Sinks.many().multicast().onBackpressureBuffer();
    private final NotificationService notificationService;
    private final ConversionService conversionService;

    @GetMapping(path = "/{id}", produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<NotificationDTO> notificationListener(final @AuthenticationPrincipal User user, final @PathVariable Long id) {
        return sink.asFlux().filter(notificationDTO -> Objects.equals(notificationDTO.getRecipientId(), id)).delayElements(Duration.ofMillis(100));
    }

    @GetMapping
    public List<NotificationDTO> getRecentNotifications(final @AuthenticationPrincipal User user) {
        return notificationService.getRecentNotifications(user).stream().map(notification -> conversionService.convert(notification, NotificationDTO.class)).toList();
    }

    @DeleteMapping(path = "/{id}")
    public void deleteNotification(final @PathVariable Long id) {
        notificationService.deleteNotification(id);
    }

    @PatchMapping(path = "/{id}")
    public void markNotificationAsRead(final @PathVariable Long id) {
        notificationService.setNotificationStatus(id, NotificationStatus.READ);
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
                .message(getMessage(notification.getNotificationEventType()))
                .notificationStatus(notification.getNotificationStatus())
                .build();
    }

    //TODO: make a util method somewhere
    private String getMessage(final NotificationEventType notificationEventType) {
        switch (notificationEventType) {
            case FRIEND_REQUEST -> {
                return "sent a friend request";
            }
            case FRIEND_ACCEPT -> {
                return "accepted your friend request";
            }
            default -> {
                return "";
            }
        }
    }
}

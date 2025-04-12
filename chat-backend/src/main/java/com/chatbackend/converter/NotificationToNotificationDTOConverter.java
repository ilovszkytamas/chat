package com.chatbackend.converter;

import com.chatbackend.dto.response.NotificationDTO;
import com.chatbackend.enums.NotificationEventType;
import com.chatbackend.model.Notification;
import org.springframework.core.convert.converter.Converter;

public class NotificationToNotificationDTOConverter implements Converter<Notification, NotificationDTO> {
    @Override
    public NotificationDTO convert(final Notification source) {
        return NotificationDTO.builder()
                .id(source.getId())
                .senderId(source.getSender().getId())
                .recipientId(source.getRecipient().getId())
                .senderFullName(source.getSender().getFullName())
                .notificationStatus(source.getNotificationStatus())
                .message(getMessage(source.getNotificationEventType()))
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

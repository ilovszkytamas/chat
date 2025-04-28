package com.notification.converter;

import com.notification.dto.NotificationDTO;
import com.notification.model.Notification;
import com.notification.util.NotificationUtils;
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
                .message(NotificationUtils.getMessage(source.getNotificationEventType()))
                .build();
    }
}

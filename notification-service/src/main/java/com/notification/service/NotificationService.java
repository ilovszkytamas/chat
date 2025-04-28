package com.notification.service;

import com.notification.enums.NotificationEventType;
import com.notification.enums.NotificationStatus;
import com.notification.model.Notification;
import com.notification.model.User;
import com.notification.notification.NotificationEventPublisher;
import com.notification.repository.NotificationRepository;
import com.notification.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationEventPublisher notificationEventPublisher;
    private final UserRepository userRepository;

    public void createNewNotification(final User sender, final User recipient, final NotificationEventType notificationEventType) {
        System.out.println("createNoti");
        final Notification notification = Notification.builder()
                .recipient(recipient)
                .sender(sender)
                .notificationStatus(NotificationStatus.UNREAD)
                .notificationEventType(notificationEventType)
                .timestamp(Timestamp.from(Instant.now()))
                .build();

        notificationRepository.save(notification);
        sender.getSender().add(notification);
        recipient.getRecipient().add(notification);

        userRepository.save(sender);
        userRepository.save(recipient);

        notificationEventPublisher.publishNotificationEvent(notification);
    }
}

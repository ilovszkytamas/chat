package com.chatbackend.service;

import com.chatbackend.enums.NotificationEventType;
import com.chatbackend.enums.NotificationStatus;
import com.chatbackend.events.notification.NotificationEventPublisher;
import com.chatbackend.model.Notification;
import com.chatbackend.model.User;
import com.chatbackend.repository.NotificationRepository;
import com.chatbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationEventPublisher notificationEventPublisher;
    private final UserRepository userRepository;

    public List<Notification> getRecentNotifications(final User user) {
        return notificationRepository.findTop10ByRecipientAndIsDeletedFalseOrderByTimestampAsc(user);
    }

    public Notification setNotificationStatus(final Long notificationId, final NotificationStatus notificationStatus) {
        final Notification notification = notificationRepository.findById(notificationId).get();
        notification.setNotificationStatus(notificationStatus);
        return notificationRepository.save(notification);
    }

    public Notification deleteNotification(final Long notificationId) {
        final Notification notification = notificationRepository.findById(notificationId).get();
        notification.setDeleted(true);
        return notificationRepository.save(notification);
    }

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

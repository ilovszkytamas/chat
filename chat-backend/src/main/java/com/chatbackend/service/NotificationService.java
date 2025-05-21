package com.chatbackend.service;

import com.chatbackend.enums.NotificationStatus;
import com.chatbackend.model.Notification;
import com.chatbackend.model.User;
import com.chatbackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> getRecentNotifications(final User user) {
        return notificationRepository.findTop10ByRecipientAndIsDeletedFalseOrderByTimestampDesc(user);
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
}

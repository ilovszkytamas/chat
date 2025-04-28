package com.notification.repository;

import com.notification.model.Notification;
import com.notification.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<Notification> findById(Long id);

    //List<Notification> findTop10ByNotificationStatusAndRecipientOrderByTimestampAsc(NotificationStatus notificationStatus, User recipient);

    List<Notification> findTop10ByRecipientAndIsDeletedFalseOrderByTimestampAsc(User recipient);
}

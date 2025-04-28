package com.notification.dto;

import com.notification.enums.NotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private Long senderId;
    private Long recipientId;
    private String message;
    private String senderFullName;
    private NotificationStatus notificationStatus;
}

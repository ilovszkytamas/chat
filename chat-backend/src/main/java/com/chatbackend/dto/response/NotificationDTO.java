package com.chatbackend.dto.response;

import com.chatbackend.enums.NotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long senderId;
    private String message;
    private String senderFullName;
    private NotificationStatus notificationStatus;
}

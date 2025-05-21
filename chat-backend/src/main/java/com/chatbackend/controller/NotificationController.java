package com.chatbackend.controller;

import com.chatbackend.dto.response.NotificationDTO;
import com.chatbackend.enums.NotificationStatus;
import com.chatbackend.model.User;
import com.chatbackend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final ConversionService conversionService;

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
}

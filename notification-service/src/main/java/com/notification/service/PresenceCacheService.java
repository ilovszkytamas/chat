package com.notification.service;

import com.notification.dto.PresenceStatusDTO;
import com.notification.model.User;
import org.springframework.stereotype.Component;
import org.springframework.util.ConcurrentReferenceHashMap;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class PresenceCacheService {
    private final Map<Long, Boolean> onlineUsers = new ConcurrentReferenceHashMap<>();

    public List<PresenceStatusDTO> getFriendsPresenceStatus(User user) {
        return user.getFriends().stream()
                .map(friend -> new PresenceStatusDTO(friend.getFriend().getId(), isOnline(friend.getFriend().getId())))
                .toList();
    }

    public void setOnline(Long userId) {
        onlineUsers.put(userId, true);
    }

    public void setOffline(Long userId) {
        onlineUsers.remove(userId);
    }

    public boolean isOnline(Long userId) {
        return onlineUsers.containsKey(userId);
    }

    public Set<Long> getOnlineUsers() {
        return onlineUsers.keySet();
    }
}

package com.chatbackend.controller;

import com.chatbackend.enums.FriendRelation;
import com.chatbackend.model.Friend;
import com.chatbackend.model.User;
import com.chatbackend.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/friend")
public class FriendController {
    private final FriendService friendService;

    @GetMapping("/relation/{id}")
    public FriendRelation getFriendRelation(final @AuthenticationPrincipal User user, final @PathVariable Long id) {
        return friendService.getFriendRelation(user, id);
    }

    @PutMapping("/relation/request/{id}")
    public FriendRelation requestFriendship(final @AuthenticationPrincipal User requester, final @PathVariable Long id) {
        return friendService.requestFriendship(requester.getId(), id);
    }

    @PutMapping("/relation/reject/{id}")
    public FriendRelation rejectFriendship(final @AuthenticationPrincipal User requester, final @PathVariable Long id) {
        return friendService.rejectFriendship(requester.getId(), id);
    }

    @PutMapping("/relation/accept/{id}")
    public FriendRelation acceptFriendship(final @AuthenticationPrincipal User requester, final @PathVariable Long id) {
        return friendService.acceptFriendship(requester.getId(), id);
    }

    @GetMapping("/list")
    public Set<Friend> getFriendList(final @AuthenticationPrincipal User user) {
        return friendService.getFriendList(user);
    }
}

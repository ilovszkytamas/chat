package com.chatbackend.controller;

import com.chatbackend.dto.response.ConversationDTO;
import com.chatbackend.model.Conversation;
import com.chatbackend.model.User;
import com.chatbackend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/conversation")
public class ConversationController {
    private final ConversationService conversationService;

    @PutMapping("/{partnerId}")
    public Long getOrCreateConversion(final @AuthenticationPrincipal User user, final @PathVariable Long partnerId) {

        return conversationService.getOrCreateConversation(user, partnerId);
    }

    @GetMapping
    public List<ConversationDTO> getConversationsForUser(final @AuthenticationPrincipal User user) {

        return conversationService.getConversationsForUser(user);
    }
}

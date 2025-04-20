package com.chatbackend.controller;

import com.chatbackend.dto.websocket.ChatMessage;
import com.chatbackend.model.User;
import com.chatbackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final MessageService messageService;

    @MessageMapping("/conversation.{conversationId}")
    @SendTo("/topic/conversation.{conversationId}")
    public ChatMessage sendMessage(
            @DestinationVariable Long conversationId,
            ChatMessage message,
            Principal principal
            ) {

        User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

        message.setSenderId(user.getId());

        messageService.saveChatMessage(message, user);
        return message;
    }
}

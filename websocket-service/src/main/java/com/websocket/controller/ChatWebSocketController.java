package com.websocket.controller;

import com.websocket.dto.websocket.ChatMessage;
import com.websocket.model.User;
import com.websocket.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final ConversionService conversionService;
    private final MessageService messageService;

    @MessageMapping("/conversation.{conversationId}")
    @SendTo("/topic/conversation.{conversationId}")
    public ChatMessage sendMessage(
            @DestinationVariable Long conversationId,
            ChatMessage message,
            Principal principal
            ) {

        User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

        return conversionService.convert(messageService.saveChatMessage(message, user), ChatMessage.class);
    }
}

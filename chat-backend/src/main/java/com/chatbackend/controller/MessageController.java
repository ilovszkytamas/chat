package com.chatbackend.controller;

import com.chatbackend.dto.response.MessageDTO;
import com.chatbackend.model.Message;
import com.chatbackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {
    private final ConversionService conversionService;
    private final MessageService messageService;

    @GetMapping("conversations/{conversationId}")
    public Page<MessageDTO> getMessages(
            @PathVariable Long conversationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<Message> messages = messageService.getMessagesByConversation(conversationId, page, size);
        return messages.map(message -> conversionService.convert(message, MessageDTO.class));
    }
}

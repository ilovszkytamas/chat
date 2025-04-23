package com.websocket.service;

import com.websocket.dto.websocket.ChatMessage;
import com.websocket.model.Conversation;
import com.websocket.model.Message;
import com.websocket.model.User;
import com.websocket.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message saveChatMessage(final ChatMessage chatMessage, final User sender) {
        final Message message = Message.builder()
                .conversation(Conversation.builder().id(chatMessage.getConversationId()).build())
                .content(chatMessage.getContent())
                .sender(sender)
                .build();

        return messageRepository.save(message);
    }
}

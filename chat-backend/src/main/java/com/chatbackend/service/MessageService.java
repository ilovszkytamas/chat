package com.chatbackend.service;

import com.chatbackend.dto.websocket.ChatMessage;
import com.chatbackend.model.Conversation;
import com.chatbackend.model.Message;
import com.chatbackend.model.User;
import com.chatbackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<Message> getMessagesByConversation(Long conversationId, int page, int size) {
        final Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return messageRepository.findByConversationId(conversationId, pageable);
    }
}

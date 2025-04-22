package com.chatbackend.converter;

import com.chatbackend.dto.websocket.ChatMessage;
import com.chatbackend.model.Message;
import org.springframework.core.convert.converter.Converter;

public class MessageToChatMessageConverter implements Converter<Message, ChatMessage> {
    @Override
    public ChatMessage convert(Message source) {
        return new ChatMessage(
                source.getConversation().getId(),
                source.getSender().getId(),
                source.getContent(),
                source.getCreatedAt()
        );
    }
}

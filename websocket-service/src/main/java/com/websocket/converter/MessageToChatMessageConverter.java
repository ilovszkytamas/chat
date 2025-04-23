package com.websocket.converter;

import com.websocket.dto.websocket.ChatMessage;
import com.websocket.model.Message;
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

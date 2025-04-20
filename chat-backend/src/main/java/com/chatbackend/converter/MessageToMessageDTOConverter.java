package com.chatbackend.converter;

import com.chatbackend.dto.response.MessageDTO;
import com.chatbackend.model.Message;
import org.springframework.core.convert.converter.Converter;

public class MessageToMessageDTOConverter implements Converter<Message, MessageDTO> {
    @Override
    public MessageDTO convert(final Message source) {
        return MessageDTO
                .builder()
                .id(source.getId())
                .content(source.getContent())
                .senderId(source.getSender().getId())
                .senderName(source.getSender().getUsername())
                .conversationId(source.getConversation().getId())
                .createdAt(source.getCreatedAt())
                .build();
    }
}

package com.chatbackend.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private Long conversationId;
    private Long senderId;
    private String content;
    private LocalDateTime createdAt;
}
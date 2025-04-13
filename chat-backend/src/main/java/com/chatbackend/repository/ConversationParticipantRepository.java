package com.chatbackend.repository;

import com.chatbackend.model.ConversationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, Long> {
}

package com.chatbackend.service;

import com.chatbackend.model.Conversation;
import com.chatbackend.model.ConversationParticipant;
import com.chatbackend.model.User;
import com.chatbackend.repository.ConversationParticipantRepository;
import com.chatbackend.repository.ConversationRepository;
import com.chatbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository conversationParticipantRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long getOrCreateConversation(final User user, final Long partnerId) {
        final Optional<Conversation> existingConversation = conversationRepository.findByUserPair(user.getId(), partnerId);
        if (existingConversation.isPresent()) {
            return existingConversation.get().getId();
        } else {
            final User partner = userRepository.getUserById(partnerId);
            final Conversation newConversation = conversationRepository.save(Conversation.builder().build());
            final List<ConversationParticipant> savedParticipants = createAndSaveParticipants(user, partner, newConversation);
            newConversation.setParticipants(new HashSet<>(savedParticipants));
            return conversationRepository.save(newConversation).getId();
        }
    }

    public List<Conversation> getConversationsForUser(final User user) {
        return conversationRepository.findAllByUser(user.getId());
    }

    private List<ConversationParticipant> createAndSaveParticipants(User user1, User user2, Conversation conversation) {
        final ConversationParticipant participant1 = ConversationParticipant
                .builder()
                .user(user1)
                .conversation(conversation)
                .build();
        final ConversationParticipant participant2 = ConversationParticipant
                .builder()
                .user(user2)
                .conversation(conversation)
                .build();
        return conversationParticipantRepository.saveAll(List.of(participant1, participant2));
    }
}

package com.chatbackend.repository;

import com.chatbackend.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("""
    SELECT c FROM Conversation c
    JOIN c.participants cp1
    JOIN c.participants cp2
    WHERE (cp1.user.id = :userId1 AND cp2.user.id = :userId2)
    OR (cp1.user.id = :userId2 AND cp2.user.id = :userId1)
    """)
    Optional<Conversation> findByUserPair(@Param("userId1") Long userId1, @Param("userId2") Long userId2);

    @Query("""
    SELECT c FROM Conversation c
    JOIN c.participants cp1
    JOIN c.participants cp2
    WHERE cp1.user.id = :userId OR cp2.user.id = :userId
    """)
    List<Conversation> findAllByUser(@Param("userId") Long userId);
}

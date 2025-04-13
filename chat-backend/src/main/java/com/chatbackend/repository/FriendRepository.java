package com.chatbackend.repository;

import com.chatbackend.enums.FriendRelation;
import com.chatbackend.model.Friend;
import com.chatbackend.model.FriendKey;
import com.chatbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, FriendKey> {
    List<Friend> findByOwnerAndFriendRelation(User owner, FriendRelation friendRelation);
}

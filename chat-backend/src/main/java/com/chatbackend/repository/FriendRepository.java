package com.chatbackend.repository;

import com.chatbackend.model.Friend;
import com.chatbackend.model.Key;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Key> {
}

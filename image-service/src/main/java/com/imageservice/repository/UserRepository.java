package com.imageservice.repository;

import com.imageservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<com.imageservice.model.User, Long> {

    User getUserById(Long id);

    Optional<User> getUserByEmail(String email);
}

package com.chatbackend.service;

import com.chatbackend.dto.UserDTO;
import com.chatbackend.enums.Role;
import com.chatbackend.model.User;
import com.chatbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User getUserById(final Long id) {
        return userRepository.getUserById(id);
    }

    public User modifyUser(final UserDTO userDTO, final User currentUser) {
        if (currentUser.getRole() != Role.USER && !currentUser.getId().equals(userDTO.getId())) {
            throw new IllegalArgumentException("Not matching User IDs");
        }

        currentUser.setEmail(userDTO.getEmail());
        currentUser.setFirstName(userDTO.getFirstName());
        currentUser.setLastName(userDTO.getLastName());

        return userRepository.save(currentUser);
    }

    public UserDetailsService userDetailsService() {
        return username -> userRepository.getUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User save(final User user) {
        return userRepository.save(user);
    }

    public List<User> searchUsers(final String query) {
        return userRepository.findByFullNameContaining(query);
    }
}

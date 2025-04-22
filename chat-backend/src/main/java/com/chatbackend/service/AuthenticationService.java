package com.chatbackend.service;

import com.chatbackend.dto.request.LoginRequest;
import com.chatbackend.dto.request.RegisterRequest;
import com.chatbackend.dto.response.JwtAuthResponse;
import com.chatbackend.enums.Role;
import com.chatbackend.model.User;
import com.chatbackend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtAuthResponse register(final RegisterRequest request) throws Exception {
        User user = User
            .builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .fullName(request.getFirstName() + " " + request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .imageLocation("/uploads/images/Default.jpg").build();
        Optional<User> existingUser = userRepository.getUserByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("User already exists");
        }
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return JwtAuthResponse.builder().token(jwt).build();
    }

    public JwtAuthResponse login(final LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.getUserByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        String jwt = jwtService.generateToken(user);
        return JwtAuthResponse.builder().token(jwt).build();
    }
}
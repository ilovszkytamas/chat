package com.chatbackend.controller;

import com.chatbackend.dto.request.LoginRequest;
import com.chatbackend.dto.request.RegisterRequest;
import com.chatbackend.dto.response.JwtAuthResponse;
import com.chatbackend.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public JwtAuthResponse register(final @Valid @RequestBody RegisterRequest request) throws Exception{
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public JwtAuthResponse login(final @RequestBody LoginRequest request) {
        return authenticationService.login(request);
    }
}
package com.chatbackend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name must not be empty")
    private String firstName;

    @NotBlank(message = "Last name must not be empty")
    private String lastName;

    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Invalid email format", regexp = "^(.+)@(\\S+)$")
    private String email;

    // TODO: revert it to 8 later
    @Size(min = 1, message = "Password must be between 8 and 20 characters length")
    @Size(max = 20, message = "Password must be between 8 and 20 characters length")
    private String password;
}
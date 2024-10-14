package com.chatbackend.controller;

import com.chatbackend.dto.UserDTO;
import com.chatbackend.model.User;
import com.chatbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final ConversionService conversionService;
    private final UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/current")
    public UserDTO getCurrentUser(final @AuthenticationPrincipal User user) {
        return conversionService.convert(userService.getUserById(user.getId()), UserDTO.class);
    }

    @PostMapping("/current")
    public UserDTO modifyCurrentUser(final @Valid @RequestBody UserDTO userDTO, final @AuthenticationPrincipal User currentUser) {
        return conversionService.convert(userService.modifyUser(userDTO, currentUser), UserDTO.class);
    }

    @GetMapping("/get-all")
    public List<User> getEveryUser(@AuthenticationPrincipal User user) {
        System.out.println(user.toString());
        return userService.getAllUser();
    }

    @PostMapping("/add")
    @ResponseBody
    public User addUser(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/search/{query}")
    public List<UserDTO> searchUsers(@PathVariable String query) {
        return userService.searchUsers(query).stream().map(user -> conversionService.convert(user, UserDTO.class)).toList();
    }
}
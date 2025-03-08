package com.chatbackend.converter;

import com.chatbackend.dto.UserDTO;
import com.chatbackend.model.User;
import org.springframework.core.convert.converter.Converter;

public class UserToUserDTOConverter implements Converter<User, UserDTO> {
    @Override
    public UserDTO convert(final User source) {
        return UserDTO
            .builder()
            .id(source.getId())
            .email(source.getEmail())
            .firstName(source.getFirstName())
            .lastName(source.getLastName())
            .fullName(source.getFullName())
            .build();
    }
}

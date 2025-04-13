package com.chatbackend.converter;

import com.chatbackend.dto.response.FriendDTO;
import com.chatbackend.model.Friend;
import org.springframework.core.convert.converter.Converter;

public class FriendToFriendDTOConverter implements Converter<Friend, FriendDTO> {

    @Override
    public FriendDTO convert(Friend source) {
        return FriendDTO.builder()
                .friendId(source.getFriend().getId())
                .name(source.getFriend().getFirstName() + " " + source.getFriend().getLastName())
                .isOnline(true)
                .build();
    }
}

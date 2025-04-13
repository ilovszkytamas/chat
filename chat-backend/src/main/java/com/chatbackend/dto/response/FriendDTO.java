package com.chatbackend.dto.response;

import com.chatbackend.enums.FriendRelation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendDTO {
    private Long friendId;
    private String name;
    private boolean isOnline;
}

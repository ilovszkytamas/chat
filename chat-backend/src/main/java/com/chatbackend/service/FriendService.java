package com.chatbackend.service;

import com.chatbackend.dto.response.FriendDTO;
import com.chatbackend.enums.FriendRelation;
import com.chatbackend.enums.NotificationEventType;
import com.chatbackend.grpc.GrpcClientService;
import com.chatbackend.model.Friend;
import com.chatbackend.model.User;
import com.chatbackend.repository.FriendRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendService {
    private final UserService userService;
    private final FriendRepository friendRepository;
    private final NotificationService notificationService;
    private final ConversionService conversionService;
    private final GrpcClientService grpcClientService;

    public FriendRelation getFriendRelation(final User currentUser, final Long otherUserId) {
        final User otherUser = userService.getUserById(otherUserId);
        Optional<Friend> userFromFriend = currentUser.getFriends().stream().filter(friend -> friend.getFriend().equals(otherUser)).findFirst();
        if (userFromFriend.isPresent()) {
            return userFromFriend.get().getFriendRelation();
        }

        return FriendRelation.NONE;
    }

    //TODO: WHAT IF DELETED AND REREQUESTED?
    public FriendRelation requestFriendship(final Long requesterId, final Long recipientId) {
        final User requester = userService.getUserById(requesterId);
        final User recipient = userService.getUserById(recipientId);
        final Optional<Friend> requesterAsFriend = recipient.getFriends().stream().filter(friend -> friend.getFriend().equals(requester)).findFirst();
        final Optional<Friend> recipientAsFriend = requester.getFriends().stream().filter(friend -> friend.getFriend().equals(recipient)).findFirst();
        if (recipientAsFriend.isPresent() && requesterAsFriend.isPresent()) {
            requesterAsFriend.ifPresent(friend -> {
                friend.setFriendRelation(FriendRelation.PENDING_RECIPIENT);
                friendRepository.save(friend);
                userService.save(requester);
            });
            recipientAsFriend.ifPresent(friend -> {
                friend.setFriendRelation(FriendRelation.PENDING_SENDER);
                friendRepository.save(friend);
                userService.save(requester);
            });

            grpcClientService.sendNotification(requesterId, recipientId, com.notification.grpc.NotificationEventType.FRIEND_REQUEST);

            return FriendRelation.PENDING_SENDER;
        }

        final Friend friendRequester = Friend
                .builder()
                .owner(requester)
                .friend(recipient)
                .friendRelation(FriendRelation.PENDING_SENDER)
                .build();
        final Friend friendRecipient = Friend
                .builder()
                .owner(recipient)
                .friend(requester)
                .friendRelation(FriendRelation.PENDING_RECIPIENT)
                .build();
        friendRepository.save(friendRequester);
        friendRepository.save(friendRecipient);
        requester.getFriends().add(friendRequester);
        recipient.getFriends().add(friendRecipient);
        userService.save(requester);
        userService.save(recipient);

        grpcClientService.sendNotification(requesterId, recipientId, com.notification.grpc.NotificationEventType.FRIEND_REQUEST);

        return FriendRelation.PENDING_SENDER;
    }

    public FriendRelation rejectFriendship(final Long requesterId, final Long recipientId) {
        final User requester = userService.getUserById(requesterId);
        final User recipient = userService.getUserById(recipientId);
        final Optional<Friend> recipientAsFriend = requester.getFriends().stream().filter(friend -> friend.getFriend().equals(recipient)).findFirst();
        final Optional<Friend> requesterAsFriend = recipient.getFriends().stream().filter(friend -> friend.getFriend().equals(requester)).findFirst();
        recipientAsFriend.ifPresent(friend -> {
            friend.setFriendRelation(FriendRelation.REJECTED);
            friendRepository.save(friend);
            userService.save(requester);
        });
        requesterAsFriend.ifPresent(friend -> {
            friend.setFriendRelation(FriendRelation.REJECTED);
            friendRepository.save(friend);
            userService.save(requester);
        });

        return FriendRelation.REJECTED;
    }

    public FriendRelation acceptFriendship(final Long requesterId, final Long recipientId) {
        final User requester = userService.getUserById(requesterId);
        final User recipient = userService.getUserById(recipientId);
        final Optional<Friend> recipientAsFriend = requester.getFriends().stream().filter(friend -> friend.getFriend().equals(recipient)).findFirst();
        final Optional<Friend> requesterAsFriend = recipient.getFriends().stream().filter(friend -> friend.getFriend().equals(requester)).findFirst();
        recipientAsFriend.ifPresent(friend -> {
            friend.setFriendRelation(FriendRelation.ACCEPTED);
            friendRepository.save(friend);
            userService.save(requester);
        });
        requesterAsFriend.ifPresent(friend -> {
            friend.setFriendRelation(FriendRelation.ACCEPTED);
            friendRepository.save(friend);
            userService.save(requester);
        });

        grpcClientService.sendNotification(requesterId, recipientId, com.notification.grpc.NotificationEventType.FRIEND_ACCEPT);

        return FriendRelation.ACCEPTED;
    }

    public List<FriendDTO> getFriendList(final User user) {
        final List<Friend> friendList = friendRepository.findByOwnerAndFriendRelation(user, FriendRelation.ACCEPTED);

        return friendList.stream().map(friend -> conversionService.convert(friend, FriendDTO.class)).toList();
    }
}

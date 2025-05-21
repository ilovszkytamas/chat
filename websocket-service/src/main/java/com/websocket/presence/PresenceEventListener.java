package com.websocket.presence;

import com.websocket.grpc.GrpcClientService;
import com.websocket.model.User;
import com.websocket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class PresenceEventListener {
    private final UserRepository userRepository;
    private final GrpcClientService grpcClientService;

    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        updatePresence(event, true);
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        updatePresence(event, false);
    }

    private void updatePresence(AbstractSubProtocolEvent event, boolean isOnline) {
        grpcClientService.updatePresence(extractUserId(event), isOnline);
    }

    private Long extractUserId(AbstractSubProtocolEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        UsernamePasswordAuthenticationToken auth =
                (UsernamePasswordAuthenticationToken) accessor.getUser();

        if (auth != null && auth.getPrincipal() instanceof UserDetails userDetails) {
            String userName = userDetails.getUsername();

            return userRepository.getUserByEmail(userName)
                    .map(User::getId)
                    .orElse(null);
        }

        return null;
    }
}

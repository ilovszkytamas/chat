package com.chatbackend.config;

import com.chatbackend.service.JwtService;
import com.chatbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response,
            @NonNull WebSocketHandler wsHandler,
            @NonNull Map<String, Object> attributes
    ) {
        System.out.println("HANDSHAKE");
        URI uri = request.getURI();
        String jwt = UriComponentsBuilder.fromUri(uri)
                .build()
                .getQueryParams()
                .getFirst("token");
        System.out.println(request.getHeaders().toString());
        if (StringUtils.isNotEmpty(jwt)) {
            String email = jwtService.extractUserName(jwt);
            System.out.println(jwt);
            System.out.println(email);
            if (email != null) {
                System.out.println(jwt);
                UserDetails userDetails = userService.userDetailsService().loadUserByUsername(email);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    System.out.println("VALID TOKEN");
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    attributes.put("SPRING.AUTHENTICATION", auth);
                } else {
                    System.out.println("INVALID TOKEN");
                }
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception
    ) {
        if (exception != null) {
            System.out.println("Handshake failed: " + exception.getMessage());
        } else {
            System.out.println("Handshake successful!");
        }
    }
}

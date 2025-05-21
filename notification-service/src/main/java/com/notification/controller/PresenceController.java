package com.notification.controller;

import com.notification.dto.PresenceStatusDTO;
import com.notification.event.PresenceUpdateEvent;
import com.notification.model.User;
import com.notification.service.PresenceCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/presence")
@RequiredArgsConstructor
public class PresenceController {
    private final Sinks.Many<PresenceStatusDTO> presenceSink = Sinks.many().multicast().onBackpressureBuffer();
    private final PresenceCacheService presenceCacheService;

    @GetMapping(value = "/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<PresenceStatusDTO> streamPresence(@AuthenticationPrincipal User user, @PathVariable Long userId) {
        List<PresenceStatusDTO> initialStatuses = presenceCacheService.getFriendsPresenceStatus(user);

        Flux<PresenceStatusDTO> updates = presenceSink.asFlux()
                .filter(dto -> isFriend(user, dto.getUserId()));

        Flux<PresenceStatusDTO> heartbeat = Flux.interval(Duration.ofSeconds(30))
                .map(tick -> PresenceStatusDTO.builder()
                        .userId(null)
                        .online(null)
                        .build());

        return updates.mergeWith(heartbeat)
                .startWith(initialStatuses);
    }

    private boolean isFriend(User user, Long statusOwnerId) {
        return user.getFriends().stream().anyMatch(friend -> Objects.equals(friend.getFriend().getId(), statusOwnerId));
    }

    //private List<PresenceStatusDTO>

    @EventListener
    public void handlePresenceEvent(PresenceUpdateEvent event) {
        System.out.println(event);
        PresenceStatusDTO dto = PresenceStatusDTO.builder()
                .userId(event.getUserId())
                .online(event.getOnline())
                .build();
        presenceSink.tryEmitNext(dto);
    }
}


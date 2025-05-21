package com.notification.grpc;

import com.notification.event.PresenceUpdateEvent;
import com.notification.event.PresenceUpdateEventPublisher;
import com.notification.service.PresenceCacheService;
import com.presence.grpc.PresenceRequest;
import com.presence.grpc.PresenceResponse;
import com.presence.grpc.PresenceServiceGrpc;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GrpcPresenceService extends PresenceServiceGrpc.PresenceServiceImplBase {
    private final PresenceCacheService presenceCacheService;
    private final PresenceUpdateEventPublisher presenceUpdateEventPublisher;

    @Override
    public void updatePresence(PresenceRequest request, StreamObserver<PresenceResponse> responseObserver) {
        Long userId = request.getUserId();
        boolean online = request.getOnline();

        if (online) {
            presenceCacheService.setOnline(userId);
        } else {
            presenceCacheService.setOffline(userId);
        }

        presenceUpdateEventPublisher.publishEvent(new PresenceUpdateEvent(userId, online));

        responseObserver.onNext(PresenceResponse.newBuilder().setSuccess(true).build());
        responseObserver.onCompleted();
    }

}


package com.websocket.grpc;

import com.presence.grpc.PresenceRequest;
import com.presence.grpc.PresenceResponse;
import com.presence.grpc.PresenceServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class GrpcClientService {

    private final String grpcServerAddress = "localhost:9090";
    private ManagedChannel channel;
    private PresenceServiceGrpc.PresenceServiceBlockingStub presenceServiceBlockingStub;

    @PostConstruct
    public void init() {
        channel = ManagedChannelBuilder.forTarget(grpcServerAddress)
                .usePlaintext()
                .build();
        System.out.println("starting grpc channel");
        presenceServiceBlockingStub = PresenceServiceGrpc.newBlockingStub(channel);
    }

    public PresenceResponse updatePresence(Long userId, boolean isOnline) {
        PresenceRequest presenceRequest = PresenceRequest.newBuilder()
                .setUserId(userId)
                .setOnline(isOnline)
                .build();

        return presenceServiceBlockingStub.updatePresence(presenceRequest);
    }

    @PreDestroy
    public void shutdown() {
        if (channel != null) {
            channel.shutdown();
        }
    }
}


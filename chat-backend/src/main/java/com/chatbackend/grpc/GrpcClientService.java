package com.chatbackend.grpc;

import com.notification.grpc.NotificationEventType;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import com.notification.grpc.NotificationServiceGrpc;
import com.notification.grpc.NotificationRequest;
import com.notification.grpc.NotificationResponse;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class GrpcClientService {

    private final String grpcServerAddress = "localhost:9090";
    private ManagedChannel channel;
    private NotificationServiceGrpc.NotificationServiceBlockingStub notificationServiceBlockingStub;

    @PostConstruct
    public void init() {
        channel = ManagedChannelBuilder.forTarget(grpcServerAddress)
                .usePlaintext()
                .build();
        System.out.println("starting grpc channel");
        notificationServiceBlockingStub = NotificationServiceGrpc.newBlockingStub(channel);
    }

    public NotificationResponse sendNotification(long senderId, long recipientId, NotificationEventType eventType) {
        NotificationRequest request = NotificationRequest.newBuilder()
                .setSenderId(senderId)
                .setRecipientId(recipientId)
                .setEventType(eventType)
                .build();

        return notificationServiceBlockingStub.sendNotification(request);
    }

    @PreDestroy
    public void shutdown() {
        if (channel != null) {
            channel.shutdown();
        }
    }
}


package com.notification.grpc;

import com.notification.enums.NotificationEventType;
import com.notification.model.User;
import com.notification.repository.UserRepository;
import com.notification.service.NotificationService;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GrpcNotificationService extends NotificationServiceGrpc.NotificationServiceImplBase {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @Override
    public void sendNotification(NotificationRequest request, StreamObserver<NotificationResponse> responseObserver) {
        User sender = userRepository.findById(request.getSenderId()).orElseThrow();
        User recipient = userRepository.findById(request.getRecipientId()).orElseThrow();

        NotificationEventType eventType = NotificationEventType.valueOf(request.getEventType().name());

        notificationService.createNewNotification(sender, recipient, eventType);

        responseObserver.onNext(NotificationResponse.newBuilder().setSuccess(true).build());
        responseObserver.onCompleted();
    }
}

package com.notification.config;

import com.notification.grpc.GrpcNotificationService;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PreDestroy;

@Configuration
@RequiredArgsConstructor
public class GrpcServerConfig {

    private Server server;

    private final GrpcNotificationService grpcNotificationService;

    @Bean(initMethod = "start", destroyMethod = "shutdown")
    public Server grpcServer() {
        System.out.println("starting grpc server");
        this.server = ServerBuilder
                .forPort(9090)
                .addService(grpcNotificationService)
                .build();
        return this.server;
    }

    @PreDestroy
    public void stop() {
        if (server != null) {
            server.shutdown();
        }
    }
}

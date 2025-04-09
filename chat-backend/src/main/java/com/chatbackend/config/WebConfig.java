package com.chatbackend.config;

import com.chatbackend.converter.NotificationToNotificationDTOConverter;
import com.chatbackend.converter.UserToUserDTOConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new UserToUserDTOConverter());
        registry.addConverter(new NotificationToNotificationDTOConverter());
    }
}

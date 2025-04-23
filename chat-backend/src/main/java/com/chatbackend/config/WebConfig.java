package com.chatbackend.config;

import com.chatbackend.converter.FriendToFriendDTOConverter;
import com.chatbackend.converter.MessageToMessageDTOConverter;
import com.chatbackend.converter.NotificationToNotificationDTOConverter;
import com.chatbackend.converter.UserToUserDTOConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new UserToUserDTOConverter());
        registry.addConverter(new NotificationToNotificationDTOConverter());
        registry.addConverter(new FriendToFriendDTOConverter());
        registry.addConverter(new MessageToMessageDTOConverter());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**")
                .addResourceLocations("file:uploads/images/");
    }
}

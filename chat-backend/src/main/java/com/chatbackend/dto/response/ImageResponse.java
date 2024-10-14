package com.chatbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponse {
    private MediaType mediaType;
    private ByteArrayResource inputStream;
}

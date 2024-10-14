package com.chatbackend.controller;

import com.chatbackend.dto.response.ImageResponse;
import com.chatbackend.model.User;
import com.chatbackend.service.ImageService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/img")
public class ImageController {
    private final ImageService imageService;

    @GetMapping(value = "/profile/{id}", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    public ResponseEntity<Resource> getProfilePictureById(@PathVariable final Long id) throws IOException {
        final ImageResponse imageResponse = imageService.getProfilePictureByUserId(id);
        final ByteArrayResource inputStream = imageResponse.getInputStream();

        return ResponseEntity
            .status(HttpStatus.OK)
            .contentLength(inputStream.contentLength())
            .contentType(imageResponse.getMediaType())
            .body(inputStream);
        }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam final MultipartFile file, @AuthenticationPrincipal final User user) throws IOException {
        imageService.saveFile(file, user);
        System.out.println((String.format("File name '%s' uploaded successfully.", file.getOriginalFilename())));
        return ResponseEntity.ok().build();
    }
}

package com.chatbackend.service;

import com.chatbackend.dto.response.ImageResponse;
import com.chatbackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final UserService userService;
    private final String DEFAULT_IMAGE_LOCATION = "src/main/resources/static/images/Default.jpg";
    private final String DEFAULT_IMAGE_FOLDER = "src/main/resource/static/images/";

    public ImageResponse getProfilePictureByUserId(final Long id) throws IOException {
        final User user = userService.getUserById(id);

        final ByteArrayResource inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(
                user.getImageLocation() != null ? user.getImageLocation() : DEFAULT_IMAGE_LOCATION
        )));
        final MediaType mediaType = getResponseType(user.getImageLocation());

        return ImageResponse
            .builder()
            .mediaType(mediaType)
            .inputStream(inputStream)
            .build();
    }

    public void saveFile(final MultipartFile multipartFile, final User user) throws IOException {
        final String filePath = DEFAULT_IMAGE_FOLDER + File.separator + multipartFile.getOriginalFilename();
        final File file = new File(filePath);
        multipartFile.transferTo(file);
    }

    private MediaType getResponseType(final String imageLocation) {
        if (imageLocation == null || imageLocation.endsWith(".jpg")) {
            return MediaType.IMAGE_JPEG;
        }
        return MediaType.IMAGE_PNG;
    }
}

package com.imageservice.service;

import com.imageservice.dto.ImageResponse;
import com.imageservice.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final UserService userService;
    private final String IMAGE_FOLDER = Paths.get(System.getProperty("user.dir"), "uploads", "images").toString();
    private final String DEFAULT_IMAGE_PATH = "uploads/images/Default.jpg";

    public ImageResponse getProfilePictureByUserId(final Long id) throws IOException {
        final User user = userService.getUserById(id);
        String imagePath = user.getImageLocation() != null ? user.getImageLocation() : DEFAULT_IMAGE_PATH;

        Path path = Paths.get(imagePath);
        if (!Files.exists(path)) {
            path = Paths.get(DEFAULT_IMAGE_PATH);
        }

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
        MediaType mediaType = getMediaType(path.toString());

        return ImageResponse
                .builder()
                .mediaType(mediaType)
                .inputStream(resource)
                .build();
    }

    public void saveFile(final MultipartFile multipartFile, final User user) throws IOException {
        File dir = new File(IMAGE_FOLDER);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String extension = getExtension(multipartFile.getOriginalFilename());
        String safeFileName = "user_" + user.getId() + extension;
        String filePath = IMAGE_FOLDER + safeFileName;

        File file = new File(filePath);
        multipartFile.transferTo(file);

        user.setImageLocation(filePath);
        userService.save(user);
    }

    private MediaType getMediaType(String path) {
        if (path.toLowerCase().endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        }
        return MediaType.IMAGE_JPEG;
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return ".jpg";
        }
        return filename.substring(filename.lastIndexOf('.'));
    }
}

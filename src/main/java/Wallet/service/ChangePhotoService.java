package Wallet.service;

import Wallet.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ChangePhotoService {

    private final UserRepository userRepository;

    public ChangePhotoService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String addImage(MultipartFile image) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nameImage = authentication.getName() + "-userProfile";
        String url = writeImageInServer(image, nameImage);

        userRepository.changePhotoUser(authentication.getName(), url);

        return "ok";
    }


    private String writeImageInServer(MultipartFile image, String nameImage) throws IOException {
        InputStream initialStream = image.getInputStream();
        byte[] buffer = new byte[initialStream.available()];
        initialStream.read(buffer);

        ByteArrayInputStream bais = new ByteArrayInputStream(buffer);
        BufferedImage imageBuffer = ImageIO.read(bais);

        ImageIO.write(changeSize(imageBuffer, 150.0), "jpg", new File("src/main/resources/upload/userProfile/" + nameImage + ".jpg"));
        return "/upload/userProfile/" + nameImage + ".jpg";

    }

    private BufferedImage changeSize(BufferedImage imageBuffer, Double size) {
        int width = imageBuffer.getWidth();
        int hight = imageBuffer.getHeight();
        double koef = hight / size;
        int newWidth = (int) Math.round(width / koef);
        int newHight = (int) Math.round(size);
        //Уменьшаем размер
        Image resultingImage = imageBuffer.getScaledInstance(newWidth, newHight, Image.SCALE_DEFAULT);
        BufferedImage outputImage = new BufferedImage(newWidth, newHight, BufferedImage.TYPE_INT_RGB);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
        return outputImage;
    }

}

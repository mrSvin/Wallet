package Wallet.service;

import Wallet.api.response.CaptchaResponse;
import Wallet.model.CaptchaCodes;
import Wallet.repository.CaptchaRepository;
import com.github.cage.Cage;
import com.github.cage.GCage;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
public class CaptchaService {

    private final CaptchaRepository captchaRepository;
    private CaptchaCodes captchaCodes = new CaptchaCodes();

    public CaptchaService(CaptchaRepository captchaRepository) {
        this.captchaRepository = captchaRepository;
    }

    public CaptchaResponse captchaGenerate() throws IOException {

        CaptchaResponse captchaResponse = new CaptchaResponse();

        Cage cage = new GCage();
        String captcha = cage.getTokenGenerator().next();
        captcha = captcha.substring(0, 5);
        String secretCode = cage.getTokenGenerator().next();
        secretCode = secretCode.substring(0, 5);

        String base64 = base64(cage, captcha);
        captchaResponse.setImage("data:image/png;base64, " + base64);
        captchaResponse.setSecret(secretCode);

        saveCaptcha(secretCode, captcha, timeNow());

        return captchaResponse;
    }

    private String base64(Cage cage, String captcha) throws IOException {
        BufferedImage img = cage.drawImage(captcha);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(img, "png", baos);
        String base64 = DatatypeConverter.printBase64Binary(baos.toByteArray());
        return base64;
    }

    private void saveCaptcha(String secretCode, String captcha, Date date) {
        captchaCodes.setCode(captcha);
        captchaCodes.setSecret_code(secretCode);
        captchaCodes.setTime(date);
        captchaRepository.save(captchaCodes);
    }

    private Date timeNow() {
        long unixTime = System.currentTimeMillis() / 1000L; //Определяем текущее время
        Date date = new Date(unixTime * 1000L);
        return date;
    }

}

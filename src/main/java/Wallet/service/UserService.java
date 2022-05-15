package Wallet.service;

import Wallet.repository.CaptchaRepository;
import Wallet.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CaptchaRepository captchaRepository;

    public UserService(UserRepository userRepository, CaptchaRepository captchaRepository) {
        this.userRepository = userRepository;
        this.captchaRepository = captchaRepository;
    }

    public String addNewUser(String email, String password, String username, String captchaSecret, String captcha) {

        int countUser = userRepository.findUser(username);
        int countEmail = userRepository.findEmail(email);
        int captchaRepo = captchaRepository.findByCaptcha(captcha, captchaSecret).size();

        if (countUser > 0) {
            return "Имя занято";
        }
        if (countEmail > 0) {
            return "Почта занята";
        }
        if (email.indexOf("@")<2 || email.indexOf(".")<4) {
            return "Почта введена некорректно";
        }
        if (captchaRepo == 0) {
            return "Каптча введена не верно";
        }

        Date date = new Date();
        userRepository.addUser("1", email, 1, password, "0", date, "ROLE_USER", username);
        return "Пользователь зарегистрирован";
    }

}

package Wallet.service;

import Wallet.api.response.UserInfoResponse;
import Wallet.init.GetUserName;
import Wallet.model.User;
import Wallet.repository.CaptchaRepository;
import Wallet.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService extends GetUserName {

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
        userRepository.addUser("1", email, 1, password, "/upload/userPhoto.png", date, "ROLE_USER", username);
        return "Пользователь зарегистрирован";
    }

    public UserInfoResponse userInfo() {
        UserInfoResponse userInfoResponse = new UserInfoResponse();

        String username = getUserName();

        if (username.equals("anonymousUser") == true) {
            userInfoResponse.setError("пользователь не авторизирован");
            return  userInfoResponse;
        }

        List<User> userInfo = userRepository.findUserInfo(username);
        userInfoResponse.setEmail(userInfo.get(0).getEmail());
        userInfoResponse.setName(userInfo.get(0).getName());
        userInfoResponse.setPhoto(userInfo.get(0).getPhoto());

        return  userInfoResponse;
    }

}

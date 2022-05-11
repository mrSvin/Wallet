package Wallet.service;

import Wallet.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String addNewUser(String email, String password, String username) {

        int countUser = userRepository.findUser(username);
        int countEmail = userRepository.findEmail(email);

        if (countUser > 0) {
            return "Имя занято";
        }
        if (countEmail > 0) {
            return "Почта занята";
        }
        if (email.indexOf("@")<2 || email.indexOf(".")<4) {
            return "Почта введена некорректно";
        }

        Date date = new Date();
        userRepository.addUser("1", email, 1, password, "0", date, "ROLE_USER", username);
        return "Пользователь зарегистрирован";
    }

}

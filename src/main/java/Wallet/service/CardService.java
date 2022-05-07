package Wallet.service;

import Wallet.repository.CardRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.Authenticator;
import java.util.Date;
import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public String addCard(String number, String dateCard, String name, String type) {

        String username = getUserName();

        if (cardRepository.findCardNumber(number) > 0) {
            return "Данный номер карты уже добавлен";
        }
        if (username.equals("anonymousUser") == true) {
            return "пользователь не авторизирован";
        }
        if (number.length() != 16) {
            return "номер карты введен не корректно";
        }
        if (dateCard.length() != 5) {
            return "дата действия карты введена не корректно";
        }
        if (type.equals("visa") == false && type.equals("mastecard") == false) {
            return "тип карты указан не корректно";
        }
        if (name.length() < 4 && name.length() > 25) {
            return "имя владельца карты введено не корректно";
        }

        Date date = new Date();
        cardRepository.addCard(date, 0, dateCard, name,
                number, type, username);

        return "ok";
    }

    public String cardsUserInfo() {

        String username = getUserName();
        List<String> result = cardRepository.findByUserName(username);
        result.stream().forEach(r->System.out.println(r));
        return "ok";
    }

    private String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

}

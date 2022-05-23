package Wallet.service;

import Wallet.api.response.CardsInfoResponse;
import Wallet.model.Card;
import Wallet.repository.CardRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.Authenticator;
import java.util.ArrayList;
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
        if (type.equals("visa") == false && type.equals("mastercard") == false && type.equals("mir") == false) {
            return "тип карты указан не корректно";
        }
        if (name.length() < 4 || name.length() > 25) {
            return "имя владельца карты введено не корректно";
        }

        Date date = new Date();
        cardRepository.addCard(date, 0, dateCard, name,
                number, type, username);

        return "ok";
    }

    public List<CardsInfoResponse>  cardsUserInfo() {

        String username = getUserName();

        if (username.equals("anonymousUser") == true) {
            return null;
        } else {
            List<CardsInfoResponse> result = new ArrayList<>();
            List<Card> cards = cardRepository.findByUserName(username);
            for (int i = 0; i<cards.size(); i++) {
                CardsInfoResponse cardsInfoResponse = new CardsInfoResponse();
                cardsInfoResponse.setCash(cards.get(i).getCash());
                cardsInfoResponse.setAddDate(cards.get(i).getAdd_time());
                cardsInfoResponse.setDate(cards.get(i).getDate());
                cardsInfoResponse.setName(cards.get(i).getName());
                cardsInfoResponse.setNumber(cards.get(i).getNumber());
                cardsInfoResponse.setType(cards.get(i).getType());
                result.add(cardsInfoResponse);
            }


            return result;
        }


    }

    private String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

}

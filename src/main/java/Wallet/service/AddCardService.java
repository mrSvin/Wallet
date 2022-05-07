package Wallet.service;

import Wallet.repository.CardRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AddCardService {

    private final CardRepository cardRepository;

    public AddCardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public String addCard() {

        Date date = new Date();
        cardRepository.addCard(date, 0, "09/22", "Alex Vasil",
                "123356484688486486856", "visa");

        return "ok";
    }

}

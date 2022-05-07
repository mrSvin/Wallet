package Wallet.service;

import Wallet.repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
public class AddCardService {

    private final CardRepository cardRepository;

    public AddCardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public String addCard() {



        return "ok";
    }

}

package Wallet.controller;

import Wallet.api.request.AddCardRequest;
import Wallet.service.CardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApiCardOperations {

    private final CardService cardService;

    public ApiCardOperations(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/addCard")
    private String addCard(@RequestBody AddCardRequest addCardRequest) {
        return cardService.addCard(addCardRequest.getNumber(), addCardRequest.getDate(),
                addCardRequest.getName(), addCardRequest.getType());
    }

    @PostMapping("/userCardsInfo")
    private List<String> userCardsInfo() {
        return cardService.cardsUserInfo();
    }

}

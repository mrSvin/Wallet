package Wallet.controller;

import Wallet.api.request.AddCardRequest;
import Wallet.api.response.CardsInfoResponse;
import Wallet.service.CardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    private List<CardsInfoResponse> userCardsInfo() {
        return cardService.cardsUserInfo();
    }

    @PostMapping("/deleteCard")
    private String deleteCard(@RequestParam(value = "cardNumber") String cardNumber) {
        return cardService.deleteCard(cardNumber);
    }

    @PostMapping("/addCash")
    private String addCashToCard(@RequestParam(value = "cardNumber") String cardNumber, @RequestParam(value = "cash") Integer cash) {
        return cardService.addCashToCard(cardNumber, cash);
    }

}

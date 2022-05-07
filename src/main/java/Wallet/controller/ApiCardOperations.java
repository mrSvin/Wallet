package Wallet.controller;

import Wallet.api.request.AddCardRequest;
import Wallet.service.AddCardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiCardOperations {

    private final AddCardService addCardService;

    public ApiCardOperations(AddCardService addCardService) {
        this.addCardService = addCardService;
    }

    @PostMapping("/addCard")
    private String addCard(@RequestBody AddCardRequest addCardRequest) {
        return addCardService.addCard(addCardRequest.getNumber(), addCardRequest.getDate(),
                addCardRequest.getName(), addCardRequest.getType());
    }

}

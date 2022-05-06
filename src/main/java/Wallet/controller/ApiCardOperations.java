package Wallet.controller;

import Wallet.api.request.AddCardRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiCardOperations {

    @PostMapping("/addCard")
    private String addCard(@RequestBody AddCardRequest addCardRequest) {
        return "ok";
    }

}

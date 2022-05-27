package Wallet.controller;

import Wallet.api.request.AddCardRequest;
import Wallet.api.request.TransactionRequest;
import Wallet.service.TransactionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiTransactions {

    private final TransactionService transactionService;

    public ApiTransactions(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transaction")
    private String transaction(@RequestBody TransactionRequest transactionRequest) {
        return transactionService.transctionCash(transactionRequest.getCardSender(), transactionRequest.getCardRecipient(),
                transactionRequest.getCashSend());
    }

}

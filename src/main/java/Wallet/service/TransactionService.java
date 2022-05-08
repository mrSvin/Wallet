package Wallet.service;

import Wallet.repository.CardRepository;
import Wallet.repository.TransctionRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TransactionService {

    private final TransctionRepository transctionRepository;
    private final CardRepository cardRepository;

    public TransactionService(TransctionRepository transctionRepository, CardRepository cardRepository) {
        this.transctionRepository = transctionRepository;
        this.cardRepository = cardRepository;
    }

    public String transctionCash(String sender, String recipient, Integer cashSend) {

        String username = getUserName();

        if (username.equals("anonymousUser") == true) {
            return "пользователь не авторизирован";
        }
        if (cardRepository.findCardNumberUser(sender, username) ==0) {
            return "Юзер не владеет картой, с которой списываются средства";
        }
        if (cardRepository.findCardNumber(recipient) == 0) {
            return "Карта получателя отсутствует в базе";
        }
        if (cardRepository.balanceCardInfo(sender)< cashSend) {
            return "На карте недостаточно средств";
        }

        Date date = new Date();
        transctionRepository.addTransaction(recipient,sender, date, cashSend);
        //Отправляем
         cardRepository.changeMoneyCard(cashSend, "4375750115309142");
        //Списываем
        cardRepository.changeMoneyCard(-cashSend, "4375750115309141");
        return "транзакция выполнена";
    }

    private String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

}

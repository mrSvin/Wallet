package Wallet.service;

import Wallet.init.GetUserName;
import Wallet.repository.CardRepository;
import Wallet.repository.TransctionRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TransactionService extends GetUserName {

    private final TransctionRepository transctionRepository;
    private final CardRepository cardRepository;

    public TransactionService(TransctionRepository transctionRepository, CardRepository cardRepository) {
        this.transctionRepository = transctionRepository;
        this.cardRepository = cardRepository;
    }

    public String transctionCash(String sender, String recipient, Integer cashSend) {

        String username = getUserName();
        sender=sender.replaceAll("_"," ");

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
         cardRepository.changeMoneyCard(cashSend, recipient);
        //Списываем
        cardRepository.changeMoneyCard(-cashSend, sender);

        System.out.println("Произведена транзакция от " + sender + " к " + recipient + " сумма: " + cashSend);
        return "транзакция выполнена";
    }

}

package Wallet.model;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity(name="transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String cardSender;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String cardRecipient;

    @Column(columnDefinition = "DATETIME")
    private int time;

    @Column(columnDefinition = "INT")
    private int cashSend;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCardSender() {
        return cardSender;
    }

    public void setCardSender(String cardSender) {
        this.cardSender = cardSender;
    }

    public String getCardRecipient() {
        return cardRecipient;
    }

    public void setCardRecipient(String cardRecipient) {
        this.cardRecipient = cardRecipient;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public int getCashSend() {
        return cashSend;
    }

    public void setCashSend(int cashSend) {
        this.cashSend = cashSend;
    }
}

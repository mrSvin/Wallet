package Wallet.api.request;

public class TransactionRequest {

    private String cardSender;
    private String cardRecipient;
    private Integer cashSend;

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

    public Integer getCashSend() {
        return cashSend;
    }

    public void setCashSend(Integer cashSend) {
        this.cashSend = cashSend;
    }
}

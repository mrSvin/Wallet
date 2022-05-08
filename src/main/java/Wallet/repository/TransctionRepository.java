package Wallet.repository;

import Wallet.model.Card;
import Wallet.model.Transaction;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

@Repository
public interface TransctionRepository extends CrudRepository<Transaction, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `wallet`.`transactions` (`card_recipient`, `card_sender`, `time`, `cash_send`) " +
            "VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void addTransaction(@Param("card_recipient") String card_recipient, @Param("card_sender") String card_sender,
                        @Param("time") Date time, @Param("cash_send") Integer cash_send);

}

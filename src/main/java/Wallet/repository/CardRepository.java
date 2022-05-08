package Wallet.repository;

import Wallet.model.Card;
import Wallet.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface CardRepository extends CrudRepository<Card, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `wallet`.`cards` (`add_time`, `cash`, `date`, `name`, `number`, `type`, `user_name`) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);", nativeQuery = true)
    void addCard(@Param("add_time") Date add_time, @Param("cash") Integer cash, @Param("date") String date,
                 @Param("name") String name, @Param("number") String number, @Param("type") String type,
                 @Param("user_name") String user_name);

    @Query(value="SELECT COUNT(*) count FROM wallet.cards where number = ?1", nativeQuery = true)
    public Integer findCardNumber(String cardNumber);

    @Query(value="SELECT * FROM wallet.cards where user_name = ?1", nativeQuery = true)
    public List<String> findByUserName(String userName);

    @Modifying
    @Transactional
    @Query(value = "UPDATE wallet.cards set cash = cash +(?1) where number = ?2", nativeQuery = true)
    void changeMoneyCard(@Param("changeCash") Integer changeCash, @Param("cardNumber") String cardNumber);

    @Query(value="SELECT COUNT(*) count FROM wallet.cards where number = ?1 AND user_name = ?2", nativeQuery = true)
    public Integer findCardNumberUser(String cardNumber, String user_name);

    @Query(value="SELECT cash FROM wallet.cards where number = ?1", nativeQuery = true)
    public Integer balanceCardInfo(String cardNumber);

}

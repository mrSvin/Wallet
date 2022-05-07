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

@Repository
public interface CardRepository extends CrudRepository<Card, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `wallet`.`cards` (`add_time`, `cash`, `date`, `name`, `number`, `type`, `user_name`) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);", nativeQuery = true)
    void addCard(@Param("add_time") Date add_time, @Param("cash") Integer cash, @Param("date") String date,
                 @Param("name") String name, @Param("number") String number, @Param("type") String type,
                 @Param("user_name") String user_name);

}

package Wallet.repository;

import Wallet.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `wallet`.`users` (`code`, `email`, `enabled`, `password`, `photo`, `reg_time`, `role`, `username`) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);", nativeQuery = true)
    public void addUser(@Param("code") String code, @Param("email") String email, @Param("enabled") int enabled, @Param("password") String password,
                        @Param("photo") String photo, @Param("reg_time") Date reg_time, @Param("role") String role,
                        @Param("username") String username );

}

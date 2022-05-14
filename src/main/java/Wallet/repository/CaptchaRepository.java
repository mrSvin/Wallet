package Wallet.repository;


import Wallet.model.CaptchaCodes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaptchaRepository extends CrudRepository<CaptchaCodes, Integer> {

    @Query(value="SELECT id FROM captcha_codes where code = ?1 and secret_code=?2", nativeQuery = true)
    public List<String> findByCaptcha(String captcha, String captchaSecret);
}

package Wallet.controller;

import Wallet.api.request.AddUserRequest;
import Wallet.api.response.CaptchaResponse;
import Wallet.service.CaptchaService;
import Wallet.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ApiUser {

    private final UserService userService;
    private final CaptchaService captchaService;

    public ApiUser(UserService userService, CaptchaService captchaService) {
        this.userService = userService;
        this.captchaService = captchaService;
    }

    @PostMapping("/addUser")
    private String addUser(@RequestBody AddUserRequest addUserRequest) {

        return userService.addNewUser(addUserRequest.getEmail(), addUserRequest.getPassword(),
                addUserRequest.getUsername());
    }

    @GetMapping("/auth/captcha")
    private CaptchaResponse Captcha() throws IOException {
        return captchaService.captchaGenerate();
    }

}

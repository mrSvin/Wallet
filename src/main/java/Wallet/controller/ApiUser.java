package Wallet.controller;

import Wallet.api.request.AddUserRequest;
import Wallet.api.response.CaptchaResponse;
import Wallet.api.response.UserInfoResponse;
import Wallet.service.CaptchaService;
import Wallet.service.ChangePhotoService;
import Wallet.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class ApiUser {

    private final UserService userService;
    private final CaptchaService captchaService;
    private final ChangePhotoService changePhotoService;

    public ApiUser(UserService userService, CaptchaService captchaService, ChangePhotoService changePhotoService) {
        this.userService = userService;
        this.captchaService = captchaService;
        this.changePhotoService = changePhotoService;
    }

    @PostMapping("/addUser")
    private String addUser(@RequestBody AddUserRequest addUserRequest) {

        return userService.addNewUser(addUserRequest.getEmail(), addUserRequest.getPassword(),
                addUserRequest.getUsername(), addUserRequest.getSecret(), addUserRequest.getCaptcha());
    }

    @GetMapping("/auth/captcha")
    private CaptchaResponse captcha() throws IOException {
        return captchaService.captchaGenerate();
    }

    @GetMapping("/userInfo")
    private UserInfoResponse userInfo() {
        return userService.userInfo();
    }

    @RequestMapping(path = "/userChangePhoto", method = POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    private Object addImage( @RequestPart(value = "image") MultipartFile image) throws IOException {
        return changePhotoService.addImage(image);
    }

}

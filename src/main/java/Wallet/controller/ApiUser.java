package Wallet.controller;

import Wallet.api.request.AddUserRequest;
import Wallet.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiUser {

    private final UserService userService;

    public ApiUser(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    private String addUser(@RequestBody AddUserRequest addUserRequest) {

        return userService.addNewUser(addUserRequest.getEmail(), addUserRequest.getPassword(),
                addUserRequest.getUsername());
    }

}

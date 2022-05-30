package Wallet.controller;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

    @RequestMapping(value="/login")
    public String login() {
        return "index";
    }

    @RequestMapping(value="/registration")
    public String registration() {
        return "index";
    }

    @RequestMapping(value="/")
    public String main() {
        return "index";
    }

}

package Wallet.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefoultController {

    @RequestMapping(value="/")
    public String index() {
        return "index";
    }

}

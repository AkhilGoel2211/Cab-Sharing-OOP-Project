package com.example.CabManageTest1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired

    @GetMapping("/")
    public RedirectView redirectToChooseRole() {
        return new RedirectView("/choose-role");
    }

    @GetMapping("/choose-role")
    public String MainPage() {
        return "main_page";
    }


    @PostMapping("/choose-role")
    public ModelAndView chooseRole(@RequestParam("role") String role) {
        if ("driver".equals(role)) {
            // Redirect to the driver registration page
            return new ModelAndView("redirect:/driver/login");
        } else if ("rider".equals(role)) {
            // Redirect to the rider registration page
            return new ModelAndView("redirect:/rider/login");
        } else {
            // Redirect back to the role choice page if something went wrong
            return new ModelAndView("redirect:/");
        }
    }
}

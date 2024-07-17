package com.example.CabManageTest1.controller;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Driver;
import com.example.CabManageTest1.service.DriverService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private DriverService driverService;

    @GetMapping("/login")
    public String loginPage() {
        return "driver_login";
    }

    @GetMapping("/home")
    public String driverPage() {
        return "driver_home";
    }

    @GetMapping("/signup")
    public ModelAndView signupPage() {
        ModelAndView mav = new ModelAndView("driver_signup");
        mav.addObject("driver", new Driver());
        return mav;
    }

    @PostMapping("/register")
    public String registerDriver(@ModelAttribute Driver driver)
    {
        driverService.saveDriver(driver);
        return "redirect:/driver/login";
    }
    @PostMapping("/login")
    public String login(@RequestParam("phonenumber") String phonenumber, @RequestParam("password") String password, HttpSession session) {
        boolean loginned = driverService.checkLogin(phonenumber, password);
        session.setAttribute("loginned", loginned);
        if(loginned){
            CabManageTest1Application.currentSesh=driverService.getIdFromPhoneNo(phonenumber);
            System.out.println(CabManageTest1Application.currentSesh);
        }
        return loginned ? "redirect:/driver/home" : "login"; // Redirect to a home page or stay on login
    }
}

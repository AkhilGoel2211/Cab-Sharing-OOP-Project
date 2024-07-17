package com.example.CabManageTest1.controller;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Rider;
import com.example.CabManageTest1.service.RiderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/rider")
public class RiderController {
    @Autowired
    private RiderService riderService;

    @GetMapping("/login")
    public String loginPage() {
        return "rider_login";
    }

    @GetMapping("/home")
    public String riderPage() {
        return "rider_home";
    }

    @GetMapping("/signup")
    public ModelAndView signupPage() {
        ModelAndView mav = new ModelAndView("rider_signup");
        mav.addObject("rider", new Rider());
        return mav;
    }

    @PostMapping("/register")
    public String registerRider(@ModelAttribute Rider rider)
    {
        riderService.saveRider(rider);
        return "redirect:/rider/login";
    }
    @PostMapping("/login")
    public String login(@RequestParam("phonenumber") String phonenumber, @RequestParam("password") String password, HttpSession session) {
        boolean loginned = riderService.checkLogin(phonenumber, password);
        session.setAttribute("loginned", loginned);
        if(loginned){
            CabManageTest1Application.currentSesh=riderService.getIdFromPhoneNo(phonenumber);
            System.out.println(CabManageTest1Application.currentSesh);
        }
        return loginned ? "redirect:/rider/home" : "login"; // Redirect to a home page or stay on login
    }
}

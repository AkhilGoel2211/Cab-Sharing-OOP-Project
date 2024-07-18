package com.example.CabManageTest1.controller;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Ride;
import com.example.CabManageTest1.model.Rider;
import com.example.CabManageTest1.service.RideService;
import com.example.CabManageTest1.service.RiderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Controller
@RequestMapping("/rider")
public class RiderController {
    @Autowired
    private RiderService riderService;
    @Autowired
    private RideService rideService;

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

    @PostMapping("/create-ride")
    public ModelAndView searchRide(
            @RequestParam("pickup") String pickup,
            @RequestParam("dropoff") String dropoff,
            @RequestParam("datetime") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date datetime,
            @RequestParam("type") int type,
            @RequestParam("maxcap") int maxcap) {

        float cost = new Random().nextFloat() * 1000;  // Generate random cost

        // Assume currentSesh is fetched or defined elsewhere
        long userId = CabManageTest1Application.currentSesh;

        rideService.createRideAndBooking(pickup, dropoff, datetime, maxcap, cost, type, (int)userId);

        return new ModelAndView("redirect:/rider/home");
    }

    @GetMapping("/available")
    public ResponseEntity<List<Ride>> getAvailableRides(
            @RequestParam String pickup,
            @RequestParam String dropoff ){

        List<Ride> availableRides = riderService.getAvailableRides(pickup, dropoff);
        return ResponseEntity.ok(availableRides);
    }

    @PostMapping("/join")
    public String acceptRide(@RequestParam("rideid") int rideid, RedirectAttributes redirectAttributes) {
        try {
            //int riderid = (int)CabManageTest1Application.currentSesh; // Ensure this is defined or configured to fetch the current driver's ID
            riderService.addToCab(rideid);
            redirectAttributes.addFlashAttribute("success", "Ride accepted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to accept the ride: " + e.getMessage());
        }
        return "redirect:/driver/home"; // Redirect back to the driver's homepage
    }
}

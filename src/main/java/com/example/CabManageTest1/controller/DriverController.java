package com.example.CabManageTest1.controller;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Driver;
import com.example.CabManageTest1.model.Ride;
import com.example.CabManageTest1.service.DriverService;
import com.example.CabManageTest1.service.RideService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private DriverService driverService;

    @Autowired
    private RideService rideService;

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

    @GetMapping("/available")
    public ResponseEntity<List<Ride>> getAvailableRides() {
        List<Ride> availableRides = rideService.getAvailableRides();
        return ResponseEntity.ok(availableRides);
    }

    @PostMapping("/accept")
    public String acceptRide(@RequestParam("rideid") int rideid, RedirectAttributes redirectAttributes) {
        try {
            System.out.println("\n\n" + rideid + "\n\n");
            int driverId = (int)CabManageTest1Application.currentSesh; // Ensure this is defined or configured to fetch the current driver's ID
            driverService.acceptRide(rideid, driverId);
            redirectAttributes.addFlashAttribute("success", "Ride accepted successfully!");
        } catch (Exception e) {
            System.out.println("\n\nHello\n\n");
            redirectAttributes.addFlashAttribute("error", "Failed to accept the ride: " + e.getMessage());
        }
        return "redirect:/driver/home"; // Redirect back to the driver's homepage
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Ride>> getUpcomingRides() {
        List<Ride> availableRides = driverService.upcomingRides();
        return ResponseEntity.ok(availableRides);
    }

    @GetMapping("/finished")
    public ResponseEntity<List<Ride>> getFinishedRides() {
        List<Ride> availableRides = driverService.finishedRides();
        return ResponseEntity.ok(availableRides);
    }

    @PostMapping("/endride")
    public String endRide(@RequestParam("rideid") int rideid, RedirectAttributes redirectAttributes) {
        try {
            int driverId = (int)CabManageTest1Application.currentSesh; // Ensure this is defined or configured to fetch the current driver's ID
            driverService.endRide(rideid);
            redirectAttributes.addFlashAttribute("success", "Ride accepted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to accept the ride: " + e.getMessage());
        }
        return "redirect:/driver/home"; // Redirect back to the driver's homepage
    }
}

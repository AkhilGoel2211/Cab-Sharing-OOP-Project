package com.example.CabManageTest1.service;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Driver;
import com.example.CabManageTest1.model.Ride;
import com.example.CabManageTest1.repository.DriverRepository;
import com.example.CabManageTest1.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

import java.util.Optional;

@Service
public class DriverService {
    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private RideRepository rideRepository;

    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }
    public boolean checkLogin(String phonenumber, String password) {
        Optional<Driver> driver = driverRepository.findByPhonenumber(phonenumber);
        if (driver.isPresent()) {
            return driver.get().getPassword().equals(password);
        }
        return false; // If no driver is found, return false.
    }
    public long getIdFromPhoneNo(String phonenumber){
        Optional<Driver> driver = driverRepository.findByPhonenumber(phonenumber);
        return driver.get().getId();
    }

    public void acceptRide(int rideId, int driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
        if((ride.getMaxcap()<=(2*(1+driverRepository.findById((long)driverId).get().getCartype())))&&(ride.getCartype()<=driverRepository.findById(driverId).get().getCartype())) {ride.setDriverid(driverId);
        rideRepository.save(ride);}
    }

    public List<Ride> finishedRides(){
        return rideRepository.findAllByDriveridAndEndedIsTrue((int)CabManageTest1Application.currentSesh);
    }
    public List<Ride> upcomingRides() {
        return rideRepository.findAllByDriveridAndEndedIsFalse((int)CabManageTest1Application.currentSesh);
    }

    public void endRide(int rideId){
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
        ride.setEnded(true);
        rideRepository.save(ride);
    }
}
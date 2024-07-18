package com.example.CabManageTest1.service;

import com.example.CabManageTest1.model.Ride;
import com.example.CabManageTest1.model.Userbooking;
import com.example.CabManageTest1.repository.RideRepository;
import com.example.CabManageTest1.repository.UserbookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;
    @Autowired
    private UserbookingRepository userbookingRepository;

    public Ride createRideAndBooking(String pickup, String dropoff, Date pickuptime, int maxcap, float cost, Integer cartype, int userId) {
        Ride ride = new Ride();
        ride.setPickup(pickup);
        ride.setDropoff(dropoff);
        ride.setPickuptime(pickuptime);
        ride.setMaxcap(maxcap);
        ride.setCost(cost);
        ride.setDriverid(null);
        ride.setCartype(cartype);
        ride.setCurrentnum(1);
        ride = rideRepository.save(ride);

        Userbooking booking = new Userbooking(userId, ride.getId(), 1, (new Random().nextInt(9000) + 1000));
        userbookingRepository.save(booking);
        return ride;
    }

    public List<Ride> getAvailableRides() {
        return rideRepository.findByDriveridIsNull();
    }
}
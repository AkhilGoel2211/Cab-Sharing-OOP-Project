package com.example.CabManageTest1.service;

import com.example.CabManageTest1.CabManageTest1Application;
import com.example.CabManageTest1.model.Ride;
import com.example.CabManageTest1.model.Rider;
import com.example.CabManageTest1.model.Userbooking;
import com.example.CabManageTest1.repository.RideRepository;
import com.example.CabManageTest1.repository.RiderRepository;
import com.example.CabManageTest1.repository.UserbookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RiderService {
    @Autowired
    private RiderRepository riderRepository;
    @Autowired
    private RideRepository rideRepository;
    @Autowired
    private UserbookingRepository userbookingRepository;

    public Rider saveRider(Rider rider) {
        return riderRepository.save(rider);
    }
    public boolean checkLogin(String phonenumber, String password) {
        Optional<Rider> rider = riderRepository.findByPhonenumber(phonenumber);
        if (rider.isPresent()) {
            return rider.get().getPassword().equals(password);
        }
        return false; // If no rider is found, return false.
    }
    public long getIdFromPhoneNo(String phonenumber){
        Optional<Rider> rider = riderRepository.findByPhonenumber(phonenumber);
        return rider.get().getId();
    }
    public List<Ride> getAvailableRides(String pickup,String dropoff){
        return rideRepository.findAvailableRides(pickup, dropoff);
    }
    public void addToCab(int rideid){
        Optional<Ride> ride=rideRepository.findById(rideid);
        ride.get().setCurrentnum(ride.get().getCurrentnum()+1);
        rideRepository.save(ride.get());
        Userbooking booking=new Userbooking((int) CabManageTest1Application.currentSesh,rideid,1,(new Random().nextInt(9000) + 1000));
        userbookingRepository.save(booking);
    }
    public List<Userbooking> historyBooking() {
        return userbookingRepository.findAllByUserid((int) CabManageTest1Application.currentSesh);
    }
    public List<Ride> historyRide(){
        List<Ride> l=new ArrayList<>();
        return l;
    }
}
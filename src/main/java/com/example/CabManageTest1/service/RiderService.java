package com.example.CabManageTest1.service;

import com.example.CabManageTest1.model.Rider;
import com.example.CabManageTest1.repository.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RiderService {
    @Autowired
    private RiderRepository riderRepository;

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

}
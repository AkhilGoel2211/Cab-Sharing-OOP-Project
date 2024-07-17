package com.example.CabManageTest1.service;

import com.example.CabManageTest1.model.Driver;
import com.example.CabManageTest1.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DriverService {
    @Autowired
    private DriverRepository driverRepository;

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

}
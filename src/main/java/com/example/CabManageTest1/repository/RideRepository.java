package com.example.CabManageTest1.repository;

import com.example.CabManageTest1.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface RideRepository extends JpaRepository<Ride, Integer> {
    List<Ride> findByDriveridIsNull();
    List<Ride> findAllByDriveridAndEndedIsFalse(int driverid);
    List<Ride> findAllByDriveridAndEndedIsTrue(int driverid);
    @Query("SELECT r FROM Ride r WHERE r.pickup = ?1 AND r.dropoff = ?2 AND r.currentnum < r.maxcap AND r.ended = false AND r.driverid IS NOT NULL")
    List<Ride> findAvailableRides(String pickup, String dropoff);
}
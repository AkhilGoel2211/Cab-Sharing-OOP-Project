package com.example.CabManageTest1.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Ride")
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private boolean ended;
    private String pickup;
    private String dropoff;
    private int maxcap;
    private int currentnum;
    private float cost;
    private Integer driverid;
    @Temporal(TemporalType.TIMESTAMP)
    private Date pickuptime;
    private Integer cartype;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDropoff() {
        return dropoff;
    }

    public void setDropoff(String dropoff) {
        this.dropoff = dropoff;
    }

    public int getMaxcap() {
        return maxcap;
    }

    public void setMaxcap(int maxcap) {
        this.maxcap = maxcap;
    }

    public int getCurrentnum() {
        return currentnum;
    }

    public void setCurrentnum(int currentnum) {
        this.currentnum = currentnum;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public Integer getDriverid() {
        return driverid;
    }

    public void setDriverid(Integer driverid) {
        this.driverid = driverid;
    }

    public Date getPickuptime() {
        return pickuptime;
    }

    public void setPickuptime(Date pickuptime) {
        this.pickuptime = pickuptime;
    }

    public Integer getCartype() {
        return cartype;
    }

    public void setCartype(Integer cartype) {
        this.cartype = cartype;
    }

    public boolean getEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }
}
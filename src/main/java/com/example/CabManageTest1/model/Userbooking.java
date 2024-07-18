package com.example.CabManageTest1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Userbooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingid;

    private int userid;

    private int rideid;

    private int seat;

    private int otp;

    // Constructors
    public Userbooking() {
    }

    public Userbooking(int userid, int rideid, int seat, int otp) {
        this.userid = userid;
        this.rideid = rideid;
        this.seat = seat;
        this.otp = otp;
    }

    // Getters and Setters
    public int getBookingId() {
        return bookingid;
    }

    public void setBookingId(int bookingid) {
        this.bookingid = bookingid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getRideid() {
        return rideid;
    }

    public void setRideid(int rideid) {
        this.rideid = rideid;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }
}
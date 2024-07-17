package com.example.CabManageTest1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Driver")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String phonenumber;
    private String name;
    private String password;
    private Integer cartype;
    private String licenceplateno;
    private Float rating;

    @Lob
    private byte[] displayimage;

    // Constructors, Getters, and Setters

    public Driver() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getCartype() {
        return cartype;
    }

    public void setCartype(Integer cartype) {
        this.cartype = cartype;
    }

    public String getLicenceplateno() {
        return licenceplateno;
    }

    public void setLicenceplateno(String licenceplateno) {
        this.licenceplateno = licenceplateno;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public byte[] getDisplayimage() {
        return displayimage;
    }

    public void setDisplayimage(byte[] displayimage) {
        this.displayimage = displayimage;
    }
}
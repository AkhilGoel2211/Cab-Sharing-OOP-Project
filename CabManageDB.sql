use CabManageDB;
DROP TABLE IF EXISTS Userbooking;
DROP TABLE IF EXISTS Ride;
DROP TABLE IF EXISTS Driver;
DROP TABLE IF EXISTS Rider;
CREATE TABLE Driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phonenumber VARCHAR(15) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    cartype int NOT NULL,
    licenceplateno VARCHAR(20) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    displayimage BLOB
);
CREATE TABLE Rider (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phonenumber VARCHAR(15) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    displayimage BLOB
);
CREATE TABLE Ride (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pickup VARCHAR(255) NOT NULL,
    dropoff VARCHAR(255) NOT NULL,
    maxcap INT NOT NULL,
    currentnum INT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    driverid INT DEFAULT NULL,
    pickuptime DATETIME NOT NULL,
    cartype int,
    ended boolean default FALSE
);
CREATE TABLE Userbooking (
    bookingid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    rideid INT,
    seat INT,
    otp INT
);
use CabManageDB;
select * from Rider;
select * from Ride;
select * from Userbooking;
select * from Driver;
show tables
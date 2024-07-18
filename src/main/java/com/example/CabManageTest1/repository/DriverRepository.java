package com.example.CabManageTest1.repository;
import java.util.Optional;
import com.example.CabManageTest1.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByPhonenumber(String phonenumber);
    Optional<Driver> findById(int id);
}


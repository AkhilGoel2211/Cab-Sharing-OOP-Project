package com.example.CabManageTest1.repository;
import java.util.Optional;
import com.example.CabManageTest1.model.Rider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiderRepository extends JpaRepository<Rider, Long> {
    Optional<Rider> findByPhonenumber(String phonenumber);
}


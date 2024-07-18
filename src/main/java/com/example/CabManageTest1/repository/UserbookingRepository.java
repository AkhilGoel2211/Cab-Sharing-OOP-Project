package com.example.CabManageTest1.repository;

import com.example.CabManageTest1.model.Userbooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserbookingRepository extends JpaRepository<Userbooking, Integer> {
    List<Userbooking> findAllByUserid(int userid);
}


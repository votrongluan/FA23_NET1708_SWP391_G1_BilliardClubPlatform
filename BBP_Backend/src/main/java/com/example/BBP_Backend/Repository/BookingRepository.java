package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Optional<List<Booking>> findAllByCustomerId(int customerId);
}

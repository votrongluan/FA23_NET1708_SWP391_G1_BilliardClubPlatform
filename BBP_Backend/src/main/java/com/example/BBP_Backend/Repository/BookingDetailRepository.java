package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, Integer> {

    Optional<List<BookingDetail>> findAllByBooking_CustomerId(int customerId);
}

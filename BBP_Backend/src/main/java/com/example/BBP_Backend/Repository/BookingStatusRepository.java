package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingStatusRepository extends JpaRepository<BookingStatus, Integer> {
    BookingStatus getBookingStatusByBookingStatusId(int bookingStatusId);
}

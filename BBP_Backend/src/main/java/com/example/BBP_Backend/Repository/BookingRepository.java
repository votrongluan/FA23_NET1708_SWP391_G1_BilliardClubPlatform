package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Optional<List<Booking>> findAllByCustomerId(int customerId);

    Booking getByBookingId(int bookingId);

    Optional<List<Booking>> getAllByCustomerId(int customerId);

    Optional<List<Booking>> getAllByClub_ClubId(int clubId);
//    @Query("select bk from Booking bk where bk.bookingId = :bookingId and bk.clubStaffId =:clubStaffId")
    Booking getBookingByBookingId(int bookingId);
}

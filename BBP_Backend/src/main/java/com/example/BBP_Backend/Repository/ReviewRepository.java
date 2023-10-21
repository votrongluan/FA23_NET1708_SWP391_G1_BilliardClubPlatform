package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("Select rv from Review rv join Booking bk on rv.bookingId.bookingId  = bk.bookingId where bk.clubId.clubId = :clubId")
    List<Review> getReviewsByClubId( int clubId);
}

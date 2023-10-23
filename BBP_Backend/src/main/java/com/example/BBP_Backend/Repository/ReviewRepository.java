package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("Select bk from Review rv join Booking bk " +
            "on rv.reviewId  = bk.review.reviewId " +
            "where bk.club.clubId = :clubId")
    List<Booking> getReviewsByClubId( int clubId);
}

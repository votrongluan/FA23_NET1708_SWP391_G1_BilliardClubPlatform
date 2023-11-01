package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Review;
import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Repository.BookingRepository;
import com.example.BBP_Backend.Repository.ReviewRepository;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Request.GiveReviewRequest;
import com.example.BBP_Backend.Response.ReviewsResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.parsing.ReaderEventListener;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;

@Data
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;


//    public List<Review> getReviewByClubId(int clubId){
//        List<Review> result = new ArrayList<>();
//    List<Review> reviews = reviewRepository.findAll();
//    if(!reviews.isEmpty()){
//        for (Review review: reviews) {
//            if(review.getBookingId().getClubId().equals(clubId)){
//                result.add(review);
//        }
//        }
//        return result;
//
//        }
//        return null;
//    }
    public List<ReviewsResponse> getCustomReview(int clubId){
        List<ReviewsResponse> result = new ArrayList<>();

        for (Booking rev: reviewRepository.getReviewsByClubId(clubId)) {
           User user = userRepository.getUserByUserId(rev.getCustomerId());

                result.add(new ReviewsResponse(
                        rev.getReview().getReviewId(),
                        rev.getReview().getStar(),
                        rev.getReview().getComment(),
                        rev.getBookDate(),
                        user.getAvatarLink(),
                        user.getUsername())

                );

        }
        return result;
    }

    public String submitFeedback(GiveReviewRequest grr) {
        // Check if the booking with the specified ID exists
        Booking booking = bookingRepository.getByBookingId(grr.getBookingId());
        if (booking == null) {
            return "Booking not found";
        }
        Review existReview = booking.getReview();
        if(existReview != null){
            existReview.setStar(grr.getStar());
            existReview.setComment(grr.getComment());
            reviewRepository.save(existReview);
        } else {

        // Create a new feedback
        Review newReview = new Review();
           // newReview.setReviewId(booking.getReview().getReviewId());
            newReview.setStar(grr.getStar());
            newReview.setComment(grr.getComment());
            booking.setReview(newReview);
        // Save the feedback
            reviewRepository.save(newReview);
            bookingRepository.save(booking);
        }

        return "Feedback submitted successfully";
    }

}

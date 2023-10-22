package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Review;
import com.example.BBP_Backend.Repository.BookingRepository;
import com.example.BBP_Backend.Repository.ReviewRepository;
import com.example.BBP_Backend.Response.ReviewsResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
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
           // if(rev.getClub().getClubId() == clubId) {
                result.add(new ReviewsResponse(
                        rev.getReview().getReviewId(),
                        rev.getReview().getStar(),
                        rev.getReview().getComment(),
                        rev.getBookDate(),
                        rev.getClub().getAvatarLink(),
                        rev.getClub().getClubName())

                );

        }
        return result;
    }
        public List<Booking> getReviews(int clubId){
        return  reviewRepository.getReviewsByClubId(clubId);
    }
}

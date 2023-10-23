package com.example.BBP_Backend.Controller;



import com.example.BBP_Backend.Response.ReviewsResponse;
import com.example.BBP_Backend.Service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


    @GetMapping("/getReviews/{clubId}")

    public ResponseEntity<List<ReviewsResponse>> getReviews(@PathVariable(name = "clubId") int clubId) {
        return ResponseEntity.ok(reviewService.getCustomReview(clubId));
    }

    @PostMapping("/giveFeedBack")
    public ResponseEntity<String> submitReview(@RequestParam(name = "bookingId") int bookingId,
                                               @RequestParam(name = "star") int star,
                                               @RequestParam(name = "comment") String comment) {
        String result = reviewService.submitFeedback(bookingId, star, comment);
        if (result.equals("Feedback submitted successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}

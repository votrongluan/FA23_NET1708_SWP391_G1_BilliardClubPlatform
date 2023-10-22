package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Review;

import com.example.BBP_Backend.Response.ReviewsResponse;
import com.example.BBP_Backend.Service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


   @GetMapping("/getReviews/{clubId}")

    public ResponseEntity<List<ReviewsResponse>> getReviews(@PathVariable(name = "clubId") int clubId){
       return ResponseEntity.ok(reviewService.getCustomReview(clubId));
   }
}

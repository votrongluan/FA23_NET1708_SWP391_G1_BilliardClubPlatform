package com.example.BBP_Backend.Response;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Club;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClubWithRating {
    @JsonProperty("club")
    private Club club;
    @JsonProperty("noBooking")
    private int noBooking;
    @JsonProperty("noRating")
    private int noRating;
    @JsonProperty("rating")
    private double rating;
}

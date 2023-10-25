package com.example.BBP_Backend.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GiveReviewRequest {
    private int bookingId;
    private int star;
    private String comment;

}

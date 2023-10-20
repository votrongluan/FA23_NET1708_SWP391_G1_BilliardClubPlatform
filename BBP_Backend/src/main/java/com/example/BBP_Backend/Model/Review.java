package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Review")
public class Review {

    @Id
    @GeneratedValue
    private int reviewId;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking bookingId;

    private int star;

    private String comment;
}

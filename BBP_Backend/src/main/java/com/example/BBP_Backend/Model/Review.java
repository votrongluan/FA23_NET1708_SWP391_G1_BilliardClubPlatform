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

    private int star;

    private String comment;

    @OneToOne(mappedBy = "review")
    private Booking booking; // A one-to-one relationship with Booking

}

package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Booking")
public class Booking {

    @Id
    @GeneratedValue
    private int bookingId;

    private int customerId;

    @ManyToOne
    @JoinColumn(name = "clubId")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Club club;

    private int clubStaffId;

    private int bookingStatusId;

    private Date bookDate;

    @OneToOne
    @JoinColumn(name = "reviewId")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Review review;
}

package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;
import java.util.List;

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

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date bookDate;

    @OneToOne
    @JoinColumn(name = "reviewId")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Review review;

    @OneToMany(mappedBy = "booking")
    private List<BookingDetail> bookingDetails;

}

package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
<<<<<<< HEAD
import java.util.Collection;
=======
>>>>>>> 69d0158f1552c2042919cbd87bf4d133ee7c22ff

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
    @JoinColumn(name = "club_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Club clubId;

    private int clubStaffId;

    private int bookingStatusId;

    private Date bookDate;

    @OneToOne(mappedBy = "bookingId", cascade = CascadeType.ALL)
    private Review review;
}

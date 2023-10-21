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
    @JoinColumn(name = "club_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Club clubId;

    private int clubStaffId;

    private int bookingStatusId;

    private Date bookDate;

    @JsonIgnore
    @OneToOne(mappedBy = "bookingId", cascade = CascadeType.ALL)
    private Review review;
}

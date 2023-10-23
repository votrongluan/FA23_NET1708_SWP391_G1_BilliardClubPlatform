package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@jakarta.persistence.Table(name = "BookingDetail")
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingDetailId;

    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;

    private int slotId;
    private int price;
    private Date bookDate;

    @ManyToOne
    @JoinColumn(name = "tableId")
    private MyTable myTable;
}

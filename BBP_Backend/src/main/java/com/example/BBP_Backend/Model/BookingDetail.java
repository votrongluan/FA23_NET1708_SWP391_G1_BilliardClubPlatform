package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@Table(name = "BookingDetail")
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
    private MyTable table;
}

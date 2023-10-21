package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "BookingDetail")
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingDetailId;
    private int bookingId;
    private int slotId;
    private int price;
    private int statusId;
    private Date bookDate;

    @ManyToOne
    @JoinColumn(name = "tableId")
    private MyTable table;
}

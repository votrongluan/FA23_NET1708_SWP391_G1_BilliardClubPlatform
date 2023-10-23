package com.example.BBP_Backend.Response;

import com.example.BBP_Backend.Model.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private int bookingId;
    private String clubName;
    private String clubAddress;
    private int districtId;
    private Date date;
    private double star;
    private String comment;
    private int tableTypeId;
    private int tableId;
    private int firstSlotId;
    private int lastSlotId;
    private int price;
}

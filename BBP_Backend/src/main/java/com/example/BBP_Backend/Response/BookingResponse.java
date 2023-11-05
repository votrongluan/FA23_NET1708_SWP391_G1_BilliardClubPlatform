package com.example.BBP_Backend.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private int bookingId;
    private int clubId;
    private String clubName;
    private String clubAddress;
    private int districtId;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date date;
    private double star;
    private String comment;
    private int bookingStatusId;
    private int tableTypeId;
    private int tableId;
    private int firstSlotId;
    private int lastSlotId;
    private int price;
    private String userPhone;
}

package com.example.BBP_Backend.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingInforResponse {
    private int bookingId;
    private int tableId;
    private int tableTypeId;
    private String userPhone;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date date;
    private int  firstSlotId;
    private int lastSlotId;
    private int  price;
}

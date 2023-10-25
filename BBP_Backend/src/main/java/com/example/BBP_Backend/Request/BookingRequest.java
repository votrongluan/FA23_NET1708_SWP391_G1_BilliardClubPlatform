package com.example.BBP_Backend.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @JsonProperty("customerId")
    private String cusId;
    @JsonProperty("bookingId")
    private String bookingId;
    @JsonProperty("clubId")
    private String clubId;
    @JsonProperty("date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date date;
}

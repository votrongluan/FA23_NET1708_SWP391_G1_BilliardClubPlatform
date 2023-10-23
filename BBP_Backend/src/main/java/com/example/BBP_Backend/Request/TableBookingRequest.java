package com.example.BBP_Backend.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class TableBookingRequest {
    private Integer tableId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date bookDate;
}

package com.example.BBP_Backend.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Date;

@Data
public class TableBookingRequest {
    private Integer tableId;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date bookDate;
}

package com.example.BBP_Backend.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookInfoResponse {
    private String userPhone;
    private String firstName;
    private Integer slotId;
}

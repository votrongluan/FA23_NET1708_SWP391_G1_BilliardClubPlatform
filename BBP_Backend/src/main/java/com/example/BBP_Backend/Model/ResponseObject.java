package com.example.BBP_Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObject {

    private String status;
    private String message;
    private Object data;

}

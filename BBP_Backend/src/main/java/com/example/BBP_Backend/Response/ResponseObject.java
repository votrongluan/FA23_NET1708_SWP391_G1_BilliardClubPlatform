package com.example.BBP_Backend.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObject {

    private String status;
    private String message;
    private Object data;

}

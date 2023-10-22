package com.example.BBP_Backend.Request;

import lombok.Data;

@Data
public class DeletePriceRequest {
    private int clubId;
    private int tableTypeId;
    private int slotId;
    private int price;
}

package com.example.BBP_Backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UpdatePriceRequest {
    private int clubId;
    private int price;
    private int tableTypeId;
    private List<Integer> slotId;;
}

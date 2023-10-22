package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.Review;
import com.example.BBP_Backend.Response.PriceResponse;
import com.example.BBP_Backend.Service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PriceController {
    private final PriceService priceService;

    @GetMapping("/getPriceByClub/{clubId}")
    public ResponseEntity<List<PriceResponse>> getPricesByClub(@PathVariable(name ="clubId" ) int clubId){
        return ResponseEntity.ok(priceService.getCustomPrices(clubId));
    }
}

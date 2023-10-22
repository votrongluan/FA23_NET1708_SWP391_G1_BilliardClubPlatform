package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Request.UpdatePriceRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:5173/")
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PriceController {

    private final PriceService priceService;

    @PutMapping("/updatePrice")
    public ResponseEntity<ResponseObject> updateOrInsertPrice(@RequestBody UpdatePriceRequest request) {
        ResponseObject responseObject = priceService.updateOrInsertPrices(request);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }
}




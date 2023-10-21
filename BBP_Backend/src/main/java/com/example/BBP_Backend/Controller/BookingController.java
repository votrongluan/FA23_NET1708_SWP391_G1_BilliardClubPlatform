package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Request.BookingRequest;
import com.example.BBP_Backend.Response.ResponeObject;
import com.example.BBP_Backend.Service.BookingService;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService service;

    @GetMapping("/getAllByCusId")
    public ResponseEntity<ResponeObject> getAllByCusId(
            @RequestBody BookingRequest request
    ) {
        try {
            List<Booking> listBooking = service.getAllByCusId(
                    Integer.parseInt(request.getCusId())
            );
            return ResponseEntity.ok(
                    new ResponeObject(
                        "Ok",
                        "Booking By CusId",
                        listBooking
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject(
                            "NotFound",
                            ex.getMessage(),
                            null
                    )
            );
        }

    }
}

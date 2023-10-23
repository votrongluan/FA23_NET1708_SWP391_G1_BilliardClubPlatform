package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Request.BookingRequest;
import com.example.BBP_Backend.Response.BookingResponse;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService service;

    @GetMapping("/getAllByCusId")
    public ResponseEntity<ResponseObject> getAllByCusId(
            @RequestBody BookingRequest request
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By CusId",
                            service.getAllByCusId(
                                    Integer.parseInt(request.getCusId())
                            )
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(
                            "NotFound",
                            ex.getMessage(),
                            null
                    )
            );
        }

    }

    @GetMapping("/getByBookingId")
    public ResponseEntity<ResponseObject> getByBookingId(
            @RequestBody BookingRequest request
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By CusId",
                            service.getById(
                                    Integer.parseInt(request.getBookingId())
                            )
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(
                            "NotFound",
                            ex.getMessage(),
                            null
                    )
            );
        }

    }

//    @GetMapping("")
}

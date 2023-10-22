package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.BookingStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequiredArgsConstructor
@RequestMapping("/api/bookingStatus")
public class BookingStatusController {
    private final BookingStatusService service;

    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "All booking status",
                            service.getAll()
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(
                            "Not Found",
                            ex.getMessage(),
                            null
                    )
            );
        }
    }
}

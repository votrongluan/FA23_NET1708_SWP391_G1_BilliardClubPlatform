package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Request.UpdateBookingStatusRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.BookingStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
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
    @PutMapping("/updateBookingStatus")
    public ResponseEntity<ResponseObject> updateBookingStatus(@RequestBody UpdateBookingStatusRequest req){
        String status =  service.updateBookingStatus(req);
        if(status.equals("Pass")){
            return ResponseEntity.ok(new ResponseObject("Ok","Update Booking Status successfully", ""));
        }else if(status.equals("Paid")){
            return  ResponseEntity.badRequest().body(new ResponseObject("Fail", "This booking has been paid!!!",""));
        }

        return  ResponseEntity.badRequest().body(new ResponseObject("Fail", "Cannot update booking status!!!",""));

    }
}

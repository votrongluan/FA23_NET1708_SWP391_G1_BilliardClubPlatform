package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Request.BookingRequest;
import com.example.BBP_Backend.Request.TableBookingRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.BookingService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequiredArgsConstructor
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/getAllByCusId")
    public ResponseEntity<ResponseObject> getAllByCusId(
            @RequestBody BookingRequest request
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By CusId",
                            bookingService.getAllByCusId(
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
                            "Booking By BookingId",
                            bookingService.getById(
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

    @GetMapping("/getByClubIdAndDate")
    public ResponseEntity<ResponseObject> getByClubIdAndDate(
            @RequestBody BookingRequest request
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By BookingId",
                            bookingService.getByClubIdAndDate(
                                    Integer.parseInt(request.getClubId()),
                                    request.getDate()
                            )
//                            request.getDate()
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

    @PostMapping("/book")
    public ResponseEntity<ResponseObject> booking(
            @RequestBody JsonNode request
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By CusId",
                            bookingService.booking(
                                    request.get("tableId").asInt(),
                                    request.get("firstSlotId").asInt(),
                                    request.get("lastSlotId").asInt(),
                                    request.get("tableTypeId").asInt(),
                                    request.get("clubId").asInt(),
                                    request.get("date").asText(),
                                    request.get("customerId").asInt()
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
    @PostMapping("/getTableBookingDetail")
    public ResponseEntity<List<Map<String, Object>>> getTableBookingInfo(@RequestBody TableBookingRequest request) {
        Date bookDate = Timestamp.valueOf(request.getBookDate().toLocalDate().atStartOfDay());

        List<Map<String, Object>> tableBookingInfo = bookingService.getTableBookingInfo(request.getTableId(), bookDate);
        return ResponseEntity.ok(tableBookingInfo);
    }

    @DeleteMapping("/cancelBooking/{bookingId}")
    public ResponseEntity<ResponseObject> deleteClub(@PathVariable Integer bookingId) {
        boolean exists = bookingService.existsById(bookingId);

        if (exists) {
            bookingService.deleteById(bookingId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Cancel Booking Successfully", "")
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("Failed", "Cannot Cancel Booking with id = " + bookingId, "")
        );
    }
}

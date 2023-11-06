package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Request.BookingRequest;
import com.example.BBP_Backend.Request.TableBookingRequest;
import com.example.BBP_Backend.Response.BookInfoResponse;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.BookingService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
@RequiredArgsConstructor
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/getAllByCusId/{cusId}")
    public ResponseEntity<ResponseObject> getAllByCusId(
            @PathVariable(name = "cusId") int cusId
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By CusId",
                            bookingService.getAllByCustomerId(cusId)
                            )
                    ) ;
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

    @GetMapping("/getByBookingId/{bookingId}")
    public ResponseEntity<ResponseObject> getByBookingId(
            @PathVariable(name ="bookingId") int bookingId
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking By BookingId",
                            bookingService.getById(bookingId)
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

    @PostMapping("/getByClubIdAndDate")
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
    public ResponseEntity<List<BookInfoResponse>> getTableBookingInfo(@RequestBody TableBookingRequest request) {
        List<BookInfoResponse> bookingInfoList = bookingService.getBookingInfo(request.getTableId(), request.getBookDate());
        return ResponseEntity.ok(bookingInfoList);
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

    @GetMapping("/getBookingsByClubId/{clubId}")
    public ResponseEntity<ResponseObject> getBookingsIn4ByClubId(
            @PathVariable(name = "clubId") int clubId
    ) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject(
                            "Ok",
                            "Booking Informations By ClubId",
                            bookingService.getBookingsInfoByClubId(clubId))
                            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(
                            "Not Found!!!",
                            ex.getMessage(),
                            null
                    )
            );
        }

    }
}

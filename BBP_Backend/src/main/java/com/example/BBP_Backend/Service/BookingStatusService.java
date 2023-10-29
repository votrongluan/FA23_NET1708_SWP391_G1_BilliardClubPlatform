package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.BookingStatus;
import com.example.BBP_Backend.Repository.BookingRepository;
import com.example.BBP_Backend.Repository.BookingStatusRepository;
import com.example.BBP_Backend.Request.UpdateBookingStatusRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingStatusService {
    private final BookingStatusRepository repository;
    private final BookingRepository bookingRepository;

    public List<BookingStatus> getAll() throws Exception {
        List<BookingStatus> bookingStatusList = repository.findAll();
        if (bookingStatusList == null || bookingStatusList.isEmpty()) {
            throw new Exception("No BookingStatus");
        }
        return bookingStatusList;
    }
    public String updateBookingStatus (UpdateBookingStatusRequest req){
        Booking booking = bookingRepository.getBookingByBookingIdAndAndClubStaffId(req.getBookingId(),req.getStaffId());
        if(booking != null) {
                if(booking.getBookingStatusId() == 1) {
                    booking.setBookingStatusId(2);
                    bookingRepository.save(booking);
                    return "Pass";
                }else{
                    return "Paid";
                }

            }

        return "Fail";
    }
}

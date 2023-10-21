package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Repository.BookingRepository;
import com.example.BBP_Backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public List<Booking> getAllByCusId(int customerId) throws Exception {
        if (userRepository.findById(customerId).isEmpty()) {
            throw new Exception("Customer not exits");
        }
        Optional<List<Booking>> bookingList = bookingRepository.findAllByCustomerId(customerId);
        if (bookingList.get().isEmpty()) {
            throw new Exception("Customer do not have booking history");
        }
        return bookingList.get();
    }

    public Booking getById(int bookingId) throws Exception{
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isEmpty()) {
            throw new Exception("No such item");
        }
        return booking.get();
    }
}

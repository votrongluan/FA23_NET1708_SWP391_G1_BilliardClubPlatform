package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.BookingStatus;
import com.example.BBP_Backend.Repository.BookingStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingStatusService {
    private final BookingStatusRepository repository;

    public List<BookingStatus> getAll() throws Exception {
        List<BookingStatus> bookingStatusList = repository.findAll();
        if (bookingStatusList == null || bookingStatusList.isEmpty()) {
            throw new Exception("No BookingStatus");
        }
        return bookingStatusList;
    }
}

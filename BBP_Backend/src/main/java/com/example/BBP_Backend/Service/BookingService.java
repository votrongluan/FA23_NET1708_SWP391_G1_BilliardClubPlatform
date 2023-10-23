package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.BookingDetail;
import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final PriceRepository priceRepository;
    private final BookingRepository bookingRepository;
    private final TableRepository tableRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final ClubRepository clubRepository;
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

    public int booking(int tableId, int firstSlotId, int lastSlotId, int tableTypeId, int clubId, String date, int customerId) {
        String[] dateArr = date.split("/");
        int day = Integer.parseInt(dateArr[0]);
        int month = Integer.parseInt(dateArr[1]);
        int year = Integer.parseInt(dateArr[2]);

        // Create a Calendar object to represent the date
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1); // Month is 0-based, so subtract 1
        calendar.set(Calendar.DAY_OF_MONTH, day);

        Date bookDate = calendar.getTime();

        Booking booking = new Booking();
        booking.setBookingStatusId(1);
        booking.setBookDate(bookDate);
        booking.setClub(clubRepository.findByClubId(clubId));
        booking.setCustomerId(customerId);
        bookingRepository.save(booking);
        // Add from firstSlotId to lastSlotId to booking detail repository
        for (int i = firstSlotId; i <= lastSlotId; i++) {
            BookingDetail bookingDetail = new BookingDetail();
            bookingDetail.setBookingId(booking.getBookingId());
            bookingDetail.setSlotId(i);
            bookingDetail.setBookDate(bookDate);
            Optional<MyTable> table = tableRepository.findById(tableId);
            bookingDetail.setTable(table.get());
            int price = priceRepository.findPriceByClubAndSlotAndTableType(clubId, i, tableTypeId);
            bookingDetail.setPrice(price);
            bookingDetailRepository.save(bookingDetail);
        }
        return booking.getBookingId();
    }

    public List<Map<String, Object>> getTableBookingInfo(Integer tableId, Date bookDate) {
        List<Object[]> result = bookingDetailRepository.getTableBookingInfo(tableId, bookDate);
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : result) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("userPhone", row[0]);
            entry.put("slotId", row[1]);
            response.add(entry);
        }

        return response;
    }
}

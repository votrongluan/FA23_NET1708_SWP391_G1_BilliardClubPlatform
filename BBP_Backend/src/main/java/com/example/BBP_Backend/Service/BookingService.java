package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.BookingDetail;
import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.*;
import com.example.BBP_Backend.Response.BookingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


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

    public List<BookingResponse> getByClubIdAndDate(int clubId, Date date) throws Exception {
        if (clubRepository.findByClubId(clubId) == null) {
            throw new Exception("Club with id " + clubId + " do not exists");
        }
        Optional<List<Booking>> bookingList = bookingRepository.getAllByClub_ClubId(clubId);
        if (bookingList.isEmpty() || bookingList.get().isEmpty()) {
            throw new Exception("Booking with clubId " + clubId + " do not exists");
        }
        bookingList.get().removeIf(bookingDetail -> {
            Calendar calendar1 = Calendar.getInstance();
            calendar1.setTime(bookingDetail.getBookDate());
            calendar1.set(Calendar.HOUR_OF_DAY, 0);
            calendar1.set(Calendar.MINUTE, 0);
            calendar1.set(Calendar.SECOND, 0);
            calendar1.set(Calendar.MILLISECOND, 0);

            Calendar calendar2 = Calendar.getInstance();
            calendar2.setTime(date);
            calendar2.set(Calendar.HOUR_OF_DAY, 0);
            calendar2.set(Calendar.MINUTE, 0);
            calendar2.set(Calendar.SECOND, 0);
            calendar2.set(Calendar.MILLISECOND, 0);

            return calendar1.before(calendar2) || calendar1.after(calendar2);
        });
        if (bookingList.get().isEmpty()) {
            throw new Exception("Booking with clubId " + clubId + " and date " + date + " do not exists");
        }
        return getAllBookingResponseInBookingList(bookingList.get());
    }

    public List<BookingResponse> getAllByCustomerId(int customerId) throws Exception {
        if (userRepository.findById(customerId).isEmpty()) {
            throw new Exception("Customer " + customerId + " do not exits");
        }
        Optional<List<Booking>> bookingList = bookingRepository.getAllByCustomerId(customerId);
        if (bookingList.isEmpty() || bookingList.get().isEmpty()) {
            throw new Exception("Customer " + customerId + " do not have booking history");
        }
        return getAllBookingResponseInBookingList(bookingList.get());
    }

    public BookingResponse getById(int bookingId) throws Exception {
        Booking booking = bookingRepository.getByBookingId(bookingId);
        if (booking == null) {
            throw new Exception("Booking with id " + bookingId + " do not exists");
        }
        return createBookingResponse(booking);
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
            bookingDetail.setBooking(booking);
            bookingDetail.setSlotId(i);
            bookingDetail.getBooking().setBookDate(bookDate);
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

    public boolean existsById(Integer bookingId) {
        return bookingRepository.existsById(bookingId);
    }

    public void deleteById(Integer bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    private List<BookingResponse> getAllBookingResponseInBookingList(List<Booking> bookings) {
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (Booking booking : bookings) {
            bookingResponses.add(createBookingResponse(booking));
        }
        return bookingResponses;
    }

    private BookingResponse createBookingResponse(Booking booking) {
        int price = 0;
        int firstSlotId = 0;
        int lastSlotId = firstSlotId;
        int tableId = 0;
        int tableTypeId = 0;
        for (BookingDetail bookingDetail : booking.getBookingDetails()) {
            if (booking.getBookingDetails().indexOf(bookingDetail) == 0) {
                price = bookingDetail.getPrice();
                firstSlotId = bookingDetail.getSlotId();
                lastSlotId = firstSlotId;
                tableId = bookingDetail.getTable().getTableId();
                tableTypeId = bookingDetail.getTable().getTableType().getTableTypeId();
            } else {
                price += bookingDetail.getPrice();
                lastSlotId = bookingDetail.getSlotId();
            }
        }
      
        BookingResponse.BookingResponseBuilder builder = BookingResponse.builder()
                .bookingId(bookingDetail.getBooking().getBookingId())
                .clubAddress(bookingDetail.getBooking().getClub().getAddress())
                .districtId(bookingDetail.getBooking().getClub().getDistrictId())
                .price(bookingDetail.getPrice())
                .clubName(bookingDetail.getBooking().getClub().getClubName())
                .date(bookingDetail.getBooking().getBookDate())
                .firstSlotId(bookingDetail.getSlotId())
                .lastSlotId(bookingDetail.getSlotId())
                .tableId(bookingDetail.getTable().getTableId())
                .tableTypeId(bookingDetail.getTable().getTableTypeId().getTableTypeId());

        if (bookingDetail.getBooking().getReview() != null) {
            builder.comment(bookingDetail.getBooking().getReview().getComment());
            builder.star(bookingDetail.getBooking().getReview().getStar());
        }

        bookingResponses.add(builder.build());

        return bookingResponses;  
    }

    public List<BookingResponse> getBookingsInfoByClubId(int clubId) throws Exception {
        if (clubRepository.findById(clubId).isEmpty()) {
            throw new Exception("Club " + clubId + " do not exits");
        }
        Optional<List<Booking>> bookingList = bookingRepository.getAllByClub_ClubId(clubId);
        if (bookingList.isEmpty() || bookingList.get().isEmpty()) {
            throw new Exception("Customer " + clubId + " do not have booking history");
        }
        return getAllBookingResponseInBookingList(bookingList.get());
    }
}


package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.BookingDetail;
import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.*;
import com.example.BBP_Backend.Response.BookingInforResponse;
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
    private final UserService userService;

    public List<BookingResponse> getByClubIdAndDate(int clubId, Date date) throws Exception{
        if (clubRepository.findByClubId(clubId) == null) {
            throw new Exception("Club with id " + clubId + " do not exists");
        }
//        Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_Club_ClubIdAndBookDate(clubId, date);
        Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_Club_ClubId(clubId);
        if (bookingDetailList.isEmpty() || bookingDetailList.get().isEmpty()) {
            throw new Exception("Booking with clubId " + clubId + " do not exists");
        }
        bookingDetailList.get().removeIf(bookingDetail -> {
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
        if (bookingDetailList.get().isEmpty()) {
            throw new Exception("Booking with clubId " + clubId + " and date " + date + " do not exists");
        }
        return getAllBookingResponseInBookingDetailList(bookingDetailList.get());
    }

    public List<BookingResponse> getAllByCusId(int customerId) throws Exception {
        if (userRepository.findById(customerId).isEmpty()) {
            throw new Exception("Customer " + customerId + " do not exits");
        }
        Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_CustomerId(customerId);
        if (bookingDetailList.isEmpty() || bookingDetailList.get().isEmpty()) {
            throw new Exception("Customer " + customerId + " do not have booking history");
        }
        return getAllBookingResponseInBookingDetailList(bookingDetailList.get());
    }

    public List<BookingResponse> getById(int bookingId) throws Exception{
        Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_BookingId(bookingId);
        if (bookingDetailList.isEmpty() || bookingDetailList.get().isEmpty()) {
            throw new Exception("Booking with id " + bookingId + " do not exists");
        }
        return getAllBookingResponseInBookingDetailList(bookingDetailList.get());
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
            bookingDetail.getBooking().setBookingId(booking.getBookingId());
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

    public boolean existsById(Integer bookingId) {
        return bookingRepository.existsById(bookingId);
    }

    public void deleteById(Integer bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    private List<BookingResponse> getAllBookingResponseInBookingDetailList(List<BookingDetail> bookingDetailList) {
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookingDetail bookingDetail: bookingDetailList) {
            int index = bookingDetailList.indexOf(bookingDetail);
            if (index == 0) {
                createBookingResponse(bookingResponses, bookingDetail);
            } else {
                boolean bookingExisted = false;
                for (BookingResponse b : bookingResponses) {
                    if (b.getBookingId() == bookingDetail.getBooking().getBookingId()) {
                        b.setLastSlotId(bookingDetail.getSlotId());
                        bookingExisted = true;
                        break;
                    }
                }
                if (!bookingExisted) {
                    createBookingResponse(bookingResponses, bookingDetail);
                }
            }
        }
        return bookingResponses;
    }

    private void createBookingResponse(List<BookingResponse> bookingResponses, BookingDetail bookingDetail) {
        bookingResponses.add(
                BookingResponse.builder()
                        .bookingId(bookingDetail.getBooking().getBookingId())
                        .clubAddress(bookingDetail.getBooking().getClub().getAddress())
                        .districtId(bookingDetail.getBooking().getClub().getDistrictId())
                        .price(bookingDetail.getPrice())
                        .clubName(bookingDetail.getBooking().getClub().getClubName())
                        .comment(bookingDetail.getBooking().getReview().getComment())
                        .date(bookingDetail.getBooking().getBookDate())
                        .firstSlotId(bookingDetail.getSlotId())
                        .lastSlotId(bookingDetail.getSlotId())
                        .star(bookingDetail.getBooking().getReview().getStar())
                        .tableId(bookingDetail.getTable().getTableId())
                        .tableTypeId(bookingDetail.getTable().getTableTypeId().getTableTypeId())
                        .build()
        );
    }
        public List<BookingInforResponse> getBookingsInfoByClubId(int clubId) throws Exception {
            if (clubRepository.findById(clubId).isEmpty()) {
                throw new Exception("Club " + clubId + " do not exits");
            }
            Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_Club_ClubId(clubId);
            if (bookingDetailList.isEmpty() || bookingDetailList.get().isEmpty()) {
                throw new Exception("Customer " + clubId + " do not have booking history");
            }
            return getBookingsInforResponseInBookingDetailList(bookingDetailList.get());
        }

    private void createBookingsInfoResponse(List<BookingInforResponse> bookingResponses, BookingDetail bookingDetail) {
        bookingResponses.add(
                BookingInforResponse.builder()
                        .bookingId(bookingDetail.getBooking().getBookingId())
                        .tableTypeId(bookingDetail.getTable().getTableTypeId().getTableTypeId())
                        .tableId(bookingDetail.getTable().getTableId())
                        .userPhone(userService.getUserPhone(bookingDetail.getBooking().getCustomerId()))
                        .date(bookingDetail.getBookDate())
                        .firstSlotId(bookingDetail.getSlotId())
                        .lastSlotId(bookingDetail.getSlotId())
                        .price(bookingDetail.getPrice())
                        .build()
        );
    }
    private List<BookingInforResponse> getBookingsInforResponseInBookingDetailList(List<BookingDetail> bookingDetailList) {
        List<BookingInforResponse> bookingInforResponses = new ArrayList<>();
        for (BookingDetail bookingDetail: bookingDetailList) {
            int index = bookingDetailList.indexOf(bookingDetail);
            if (index == 0) {
                createBookingsInfoResponse(bookingInforResponses, bookingDetail);
            } else {
                boolean bookingExisted = false;
                for (BookingInforResponse b : bookingInforResponses) {
                    if (b.getBookingId()== bookingDetail.getBooking().getBookingId()) {
                        b.setLastSlotId(bookingDetail.getSlotId());
                        bookingExisted = true;
                        break;
                    }
                }
                if (!bookingExisted) {
                    createBookingsInfoResponse(bookingInforResponses, bookingDetail);
                }
            }
        }
        return bookingInforResponses;
    }
    }


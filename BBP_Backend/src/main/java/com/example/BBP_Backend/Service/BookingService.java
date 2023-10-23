package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.BookingDetail;
import com.example.BBP_Backend.Repository.BookingDetailRepository;
import com.example.BBP_Backend.Repository.BookingRepository;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Response.BookingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingDetailRepository bookingDetailRepository;

    public List<BookingResponse> getAllByCusId(int customerId) throws Exception {
        if (userRepository.findById(customerId).isEmpty()) {
            throw new Exception("Customer not exits");
        }
        Optional<List<BookingDetail>> bookingDetailList = bookingDetailRepository.findAllByBooking_CustomerId(customerId);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if (bookingDetailList.isEmpty() || bookingDetailList.get().isEmpty()) {
            throw new Exception("Customer do not have booking history");
        }
        for (BookingDetail bookingDetail: bookingDetailList.get()) {
            int index = bookingDetailList.get().indexOf(bookingDetail);
            if (index == 0) {
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
                                .tableTypeId(bookingDetail.getTable().getTableType().getTableTypeId())
                                .build()
                );
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
                                    .tableTypeId(bookingDetail.getTable().getTableType().getTableTypeId())
                                    .build()
                    );
                }
            }
        }
        return bookingResponses;
    }

    public Booking getById(int bookingId) throws Exception{
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isEmpty()) {
            throw new Exception("No such item");
        }
        return booking.get();
    }
}

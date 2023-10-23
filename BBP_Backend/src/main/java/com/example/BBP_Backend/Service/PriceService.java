package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.PriceId;
import com.example.BBP_Backend.Repository.ClubRepository;
import com.example.BBP_Backend.Repository.PriceRepository;
import com.example.BBP_Backend.Repository.SlotRepository;
import com.example.BBP_Backend.Repository.TableTypeRepository;
import com.example.BBP_Backend.Request.UpdatePriceRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PriceService {

    private final PriceRepository priceRepository;
    private final TableTypeRepository tableTypeRepository;
    private final SlotRepository slotRepository;
    private final ClubRepository clubRepository;

    //    public ResponseObject updateOrInsertPrice(UpdatePriceRequest request) {
//        ResponseObject responseObject = new ResponseObject();
//
//        // Kiểm tra xem tableTypeId, clubId, và slotId có tồn tại trong các bảng tương ứng không
//        boolean validTableType = tableTypeRepository.existsById(request.getTableTypeId());
//        boolean validClub = clubRepository.existsById(request.getClubId());
//        boolean validSlot = slotRepository.existsById(request.getSlotId());
//
//        if (validTableType && validClub && validSlot) {
//            // Tạo đối tượng PriceId để kiểm tra sự tồn tại trong bảng Price
//            PriceId priceId = new PriceId(request.getTableTypeId(), request.getClubId(), request.getSlotId());
//
//            if (priceRepository.existsById(priceId)) {
//                // Nếu đã tồn tại, cập nhật giá
//                Price price = priceRepository.getOne(priceId);
//                price.setPrice(request.getPrice());
//                priceRepository.save(price);
//            } else {
//                // Nếu chưa tồn tại, tạo mới
//                Price price = new Price();
//                price.setTableType(tableTypeRepository.getOne(request.getTableTypeId()));
//                price.setClub(clubRepository.getOne(request.getClubId()));
//                price.setSlot(slotRepository.getOne(request.getSlotId()));
//                price.setPrice(request.getPrice());
//                priceRepository.save(price);
//            }
//
//            responseObject.setStatus("Ok");
//            responseObject.setMessage("Price has been updated or added successfully");
//            responseObject.setData(request);
//        } else {
//            responseObject.setStatus("Failed");
//            responseObject.setMessage("Unable to update price. TableType, Club or Slot does not exist");
//            responseObject.setData("");
//        }
//        return responseObject;
//    }
    public ResponseObject updateOrInsertPrices(UpdatePriceRequest request) {
        ResponseObject responseObject = new ResponseObject();

        // Kiểm tra xem tableTypeId và clubId có tồn tại trong các bảng tương ứng không
        boolean validTableType = tableTypeRepository.existsById(request.getTableTypeId());
        boolean validClub = clubRepository.existsById(request.getClubId());

        if (validTableType && validClub) {
            for (Integer slotId : request.getSlotId()) { // Sử dụng kiểu dữ liệu int ở đây
                // Kiểm tra xem slotId có tồn tại trong bảng Slot không
                boolean validSlot = slotRepository.existsById(slotId);
                if (validSlot) {
                    // Tạo đối tượng PriceId để kiểm tra sự tồn tại trong bảng Price
                    PriceId priceId = new PriceId(request.getTableTypeId(), request.getClubId(),slotId);

                    if (priceRepository.existsById(priceId)) {
                        // Nếu đã tồn tại, cập nhật giá
                        Price price = priceRepository.getOne(priceId);
                        price.setPrice(request.getPrice());
                        priceRepository.save(price);
                    } else {
                        // Nếu chưa tồn tại, tạo mới
                        Price price = new Price();
                        price.setTableType(tableTypeRepository.getOne(request.getTableTypeId()));
                        price.setClub(clubRepository.getOne(request.getClubId()));
                        price.setSlot(slotRepository.getOne(slotId));
                        price.setPrice(request.getPrice());
                        priceRepository.save(price);
                    }
                } else {
                    responseObject.setStatus("Failed");
                    responseObject.setMessage("Unable to update price. Slot with ID " + slotId + " does not exist");
                    responseObject.setData("");
                    return responseObject;
                }
            }

            responseObject.setStatus("Ok");
            responseObject.setMessage("Prices have been updated or added successfully");
            responseObject.setData(request);
        } else {
            responseObject.setStatus("Failed");
            responseObject.setMessage("Unable to update prices. TableTypeID, ClubID or SlotID does not exist");
            responseObject.setData("");
        }
        return responseObject;
    }
}


package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.*;
import com.example.BBP_Backend.Repository.ClubRepository;
import com.example.BBP_Backend.Repository.PriceRepository;
import com.example.BBP_Backend.Repository.SlotRepository;
import com.example.BBP_Backend.Repository.TableTypeRepository;
import com.example.BBP_Backend.Request.DeletePriceRequest;
import com.example.BBP_Backend.Request.UpdatePriceRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PriceService {

    private final PriceRepository priceRepository;
    private final TableTypeRepository tableTypeRepository;
    private final SlotRepository slotRepository;
    private final ClubRepository clubRepository;

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
                    PriceId priceId = new PriceId(request.getTableTypeId(), request.getClubId(), slotId);

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

    //    @Transactional
//    public ResponseObject deletePrice(DeletePriceRequest request) {
//        int clubId = request.getClubId();
//        int tableTypeId = request.getTableTypeId();
//        int slotId = request.getSlotId();
//
//        // Kiểm tra xem các ID tồn tại trong cơ sở dữ liệu
//        Club club = clubRepository.findById(clubId).orElse(null);
//        TableType tableType = tableTypeRepository.findById(tableTypeId).orElse(null);
//        Slot slot = slotRepository.findById(slotId).orElse(null);
//
//        if (club != null && tableType != null && slot != null) {
//            // Nếu tất cả ID tồn tại, thực hiện xoá các bản ghi từ bảng Price bằng SQL trực tiếp
//            priceRepository.deleteByClubIdAndTableTypeIdAndSlotId(clubId, tableTypeId, slotId);
//
//            ResponseObject responseObject = new ResponseObject(
//                    "Success", "Price deleted successfully", request);
//            return responseObject;
//        } else {
//            // Nếu ít nhất một ID không tồn tại, trả về thông báo lỗi
//            ResponseObject responseObject = new ResponseObject(
//                    "Error", "One or more IDs do not exist", "");
//            return responseObject;
//        }
//    }
    @Transactional
    public ResponseObject deletePrice(DeletePriceRequest request) {
        int clubId = request.getClubId();
        int tableTypeId = request.getTableTypeId();
        int slotId = request.getSlotId();

        // Kiểm tra xem các ID tồn tại trong cơ sở dữ liệu
        boolean clubExists = clubRepository.existsById(clubId);
        boolean tableTypeExists = tableTypeRepository.existsById(tableTypeId);
        boolean slotExists = slotRepository.existsById(slotId);

        if (clubExists && tableTypeExists && slotExists) {
            // Thử xóa bản ghi từ bảng Price
            int rowsAffected = priceRepository.deleteByClubIdAndTableTypeIdAndSlotId(clubId, tableTypeId, slotId);

            if (rowsAffected > 0) {
                ResponseObject responseObject = new ResponseObject(
                        "Success", "Price deleted successfully", "");
                return responseObject;
            } else {
                ResponseObject responseObject = new ResponseObject(
                        "Failed", "ClubID, TableTypeID, or SlotID do not exist to be deleted", "");
                return responseObject;
            }
        } else {
            ResponseObject responseObject = new ResponseObject(
                    "Failed", "ClubID, TableTypeID, or SlotID do not exist to be deleted", "");
            return responseObject;
        }
    }
}


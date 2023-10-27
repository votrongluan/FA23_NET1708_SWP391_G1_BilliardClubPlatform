package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.BookingDetail;
import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.BookingDetailRepository;
import com.example.BBP_Backend.Repository.TableRepository;
import com.example.BBP_Backend.Repository.TableTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableTypeService {
    private final TableRepository tableRepository;
    private final TableTypeRepository tableTypeRepository;
    private final BookingDetailRepository bookingDetailRepository;


    public List<TableType> findAllTableType(){
        return tableTypeRepository.findAll();
    }


    public void addNewTables(int clubId, TableType tableType, int noTable) {
        for (int i = 0; i < noTable; i++) {
            MyTable table = new MyTable();
            table.setClubId(clubId);
            table.setTableType(tableType);
            // Các thuộc tính khác của bàn có thể được thiết lập ở đây nếu cần
            tableRepository.save(table);
        }
    }

    public TableType findById(int tableTypeId) {
        return tableTypeRepository.findById(tableTypeId).orElse(null);
    }
    @Transactional
    public boolean deleteTableWithBookingDetails(int tableId) {
        MyTable myTable = tableRepository.findById(tableId).orElse(null);

        if (myTable != null) {
            // Lấy danh sách BookingDetails liên quan đến bàn
            List<BookingDetail> bookingDetails = myTable.getBookingDetails();

            // Xóa các BookingDetails liên quan đến bàn
            if (bookingDetails != null) {
                bookingDetailRepository.deleteAll(bookingDetails);
            }

            // Xóa bàn
            tableRepository.deleteById(tableId);
        }
        return false;
    }

    public boolean existsById(Integer clubId) {
        return tableRepository.existsById(clubId);
    }
}

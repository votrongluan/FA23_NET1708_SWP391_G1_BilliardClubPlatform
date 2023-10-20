package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.TableRepository;
import com.example.BBP_Backend.Repository.TableTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableTypeService {
    private final TableRepository tableRepository;
    private final TableTypeRepository tableTypeRepository;

    public List<TableType> findAllTableType(){
        return tableTypeRepository.findAll();
    }


    public void addNewTables(int clubId, TableType tableType, int noTable) {
        for (int i = 0; i < noTable; i++) {
            MyTable table = new MyTable();
            table.setClubId(clubId);
            table.setTableTypeId(tableType);
            // Các thuộc tính khác của bàn có thể được thiết lập ở đây nếu cần
            tableRepository.save(table);
        }
    }

    public TableType findById(int tableTypeId) {
        return tableTypeRepository.findById(tableTypeId).orElse(null);
    }

}

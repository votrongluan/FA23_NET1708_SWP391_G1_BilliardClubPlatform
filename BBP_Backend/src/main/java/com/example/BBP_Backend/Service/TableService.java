package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Repository.TableRepository;
import com.example.BBP_Backend.Response.TableResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TableService {
    private final TableRepository  tableRepository;

    public List<MyTable> getAllTables(int clubId){
        return tableRepository.getAllByClubId(clubId);
    }

    public List<TableResponse> getCustomTalbe(int clubId){
        List<TableResponse> result = new ArrayList<>();
        for (MyTable table: tableRepository.getAllByClubId(clubId)
             ) {
            result.add(new TableResponse(
                    table.getTableId(),
                    table.getTableType().getTableTypeId()
                    )
            );

        }
        return result;
    }
}

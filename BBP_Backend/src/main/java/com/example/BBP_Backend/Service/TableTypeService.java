package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Repository.TableTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableTypeService {
    private final TableTypeRepository tableTypeRepository;

    public List<TableType> findAllTableType(){
        return tableTypeRepository.findAll();
    }
}

package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Slot;
import com.example.BBP_Backend.Repository.SlotRepotitory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotServie {

    private final SlotRepotitory slotRepotitory;

    public List<Slot> getAll(){
        return slotRepotitory.findAll();
    }

}

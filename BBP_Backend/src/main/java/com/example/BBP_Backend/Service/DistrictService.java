package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.District;
import com.example.BBP_Backend.Repository.DistrictRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistrictService {
    private final DistrictRepository districtRepository;

    public List<District> findAllDistrict(){
        return districtRepository.findAll();
    }
}

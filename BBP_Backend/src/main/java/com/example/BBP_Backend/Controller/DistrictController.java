package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.District;
import com.example.BBP_Backend.Model.ResponeObject;
import com.example.BBP_Backend.Service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class DistrictController {
    private final DistrictService districtService;
    @GetMapping("/allDistrict")
    public ResponseEntity<ResponeObject> getAllDistrict(){
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("Ok","Query District Successfully",districtService.findAllDistrict())
        );
    }
}

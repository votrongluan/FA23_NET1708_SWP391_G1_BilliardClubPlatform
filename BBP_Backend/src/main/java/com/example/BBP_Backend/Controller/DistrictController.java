package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class DistrictController {
    private final DistrictService districtService;
    @GetMapping("/allDistrict")
    public ResponseEntity<ResponseObject> getAllDistrict(){
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("Ok","Query District Successfully",districtService.findAllDistrict())
        );
    }
}

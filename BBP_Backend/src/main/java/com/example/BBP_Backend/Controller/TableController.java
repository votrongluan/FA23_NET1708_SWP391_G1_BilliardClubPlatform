package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.ResponeObject;
import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Service.TableTypeService;
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
public class TableController {
    private final TableTypeService tableTypeService;

    @GetMapping("/allTableType")
    public ResponseEntity<ResponeObject> getAllTableType(){
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("Ok","Query TableType Successfully",tableTypeService.findAllTableType())
        );
    }

}

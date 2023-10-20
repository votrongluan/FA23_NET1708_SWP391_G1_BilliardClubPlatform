package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.ResponseObject;
import com.example.BBP_Backend.Model.TableRequest;
import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Service.TableTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class TableTypeController {
    private final TableTypeService tableTypeService;

    @GetMapping("/allTableType")
    public ResponseEntity<ResponseObject> getAllTableType(){
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("Ok","Query TableType Successfully",tableTypeService.findAllTableType())
        );
    }

    @PostMapping("/addTable")
    public ResponseEntity<ResponseObject> addNewTables(@RequestBody TableRequest tableRequest) {
        int clubId = tableRequest.getClubId();
        TableType tableType = tableTypeService.findById(tableRequest.getTableTypeId());
        int noTable = tableRequest.getNoTable();

        if (clubId <= 0 || tableType == null || noTable <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject("Failed", "The clubId or tableTypeId you entered does not exist", ""));
        }

        try {
            tableTypeService.addNewTables(clubId, tableType, noTable);
            return ResponseEntity.ok(new ResponseObject("Ok", "Tables added successfully", tableRequest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("Failed", "The clubId or tableTypeId you entered does not exist", ""));
        }
    }

}

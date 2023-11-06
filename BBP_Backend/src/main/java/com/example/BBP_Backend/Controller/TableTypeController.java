package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Request.DeleteTableRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Request.TableRequest;
import com.example.BBP_Backend.Model.TableType;
import com.example.BBP_Backend.Service.TableTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
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

    @DeleteMapping("/deleteTable/{tableId}")
    public ResponseEntity<ResponseObject> deleteTable(@PathVariable Integer tableId) {
        boolean exists = tableTypeService.existsById(tableId);

        if (exists) {
            tableTypeService.deleteTableWithBookingDetails(tableId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Delete Table Successfully", "")
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("Failed", "Cannot find Table to delete with id = " + tableId, "")
        );
    }
}

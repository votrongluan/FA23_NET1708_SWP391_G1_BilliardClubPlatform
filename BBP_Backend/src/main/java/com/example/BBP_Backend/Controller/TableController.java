package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.MyTable;
import com.example.BBP_Backend.Response.TableResponse;
import com.example.BBP_Backend.Service.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TableController {
    private final TableService tableService;

    @GetMapping("/getTablesByClubId/{clubId}")
    public ResponseEntity<List<TableResponse>> getCustomTables(@PathVariable(name = "clubId") int clubId){
        return ResponseEntity.ok(tableService.getCustomTalbe(clubId));
    }

}

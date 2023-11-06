package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.Review;
import com.example.BBP_Backend.Request.DeletePriceRequest;
import com.example.BBP_Backend.Request.UpdatePriceRequest;
import com.example.BBP_Backend.Response.PriceResponse;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PriceController {
    private final PriceService priceService;

    @GetMapping("/getPriceByClub/{clubId}")
    public ResponseEntity<List<PriceResponse>> getPricesByClub(@PathVariable(name ="clubId" ) int clubId){
        return ResponseEntity.ok(priceService.getCustomPrices(clubId));
    }
    @PutMapping("/updatePrice")
    public ResponseEntity<ResponseObject> updateOrInsertPrice(@RequestBody UpdatePriceRequest request) {
        ResponseObject responseObject = priceService.updateOrInsertPrices(request);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @DeleteMapping("/deletePrice")
    public ResponseEntity<ResponseObject> deletePrice(
            @RequestParam("clubId") int clubId,
            @RequestParam("tableTypeId") int tableTypeId,
            @RequestParam("slotId") int slotId
    ) {
        DeletePriceRequest request = new DeletePriceRequest();
        request.setClubId(clubId);
        request.setTableTypeId(tableTypeId);
        request.setSlotId(slotId);

        ResponseObject responseObject = priceService.deletePrice(request);

        if ("Failed".equals(responseObject.getStatus())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseObject);
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }
}

package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Slot;
import com.example.BBP_Backend.Service.SlotServie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"https://bilbok.netlify.app/", "http://localhost:5173/" })
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SlotController {
   private final SlotServie slotServie;


    @GetMapping("/getSlots")
    public ResponseEntity<List<Slot>> getSlots(){
        return ResponseEntity.ok(slotServie.getAll());
    }
}

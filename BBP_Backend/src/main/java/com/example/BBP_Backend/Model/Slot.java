package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@Table(name = "Slot")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slotId;
    private int startTime;
    private int endTime;

    @OneToMany(mappedBy = "slot", cascade = CascadeType.ALL)
    private List<Price> prices;

}

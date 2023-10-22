package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.sql.Time;
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
    @JsonIgnore
    private List<Price> prices;

}

package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="Slot")
public class Slot {
    @Id
    @GeneratedValue
    private int slotId;
    private int startTime;
    private int endTime;

    @OneToMany(mappedBy = "slot", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Price> prices;
}

package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "Price")
@IdClass(PriceId.class)
public class Price {

    @Id
    @ManyToOne
    @JoinColumn(name = "table_type_id")
    private TableType tableType;

    @Id
    @ManyToOne
    @JoinColumn(name = "slot_id")
    private Slot slot;

    @Id
    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    private int price;

}

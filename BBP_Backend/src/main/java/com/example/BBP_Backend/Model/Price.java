package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Price")
@IdClass(PriceId.class)
public class Price {

    @Id
    @ManyToOne
    @JoinColumn(name = "tableTypeId")
    private TableType tableType;

    @Id
    @ManyToOne
    @JoinColumn(name = "slotId")
    private Slot slot;

    @Id
    @ManyToOne
    @JoinColumn(name = "clubId")
    private Club club;

    private int price;

}

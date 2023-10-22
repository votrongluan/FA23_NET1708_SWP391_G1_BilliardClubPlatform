package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Price")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Price {

    @EmbeddedId
    private PriceId id;

    private int price;
    @ManyToOne
    @JoinColumn(name = "clubId", insertable = false, updatable = false)
    private Club club;

    @ManyToOne
    @JoinColumn(name = "slotId", insertable = false, updatable = false)
    private Slot slot;

    @ManyToOne
    @JoinColumn(name = "tableTypeId", insertable = false, updatable = false)
    private TableType tableType;


}

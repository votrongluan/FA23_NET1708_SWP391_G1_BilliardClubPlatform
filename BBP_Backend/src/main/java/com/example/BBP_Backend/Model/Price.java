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
@IdClass(PriceId.class)
public class Price {



    private int price;

    @Id
    @ManyToOne
    @JoinColumn(name = "clubId",insertable = false, updatable = false)
    private Club club;

    @Id
    @ManyToOne
    @JoinColumn(name = "slotId",insertable = false, updatable = false)
    private Slot slot;

    @Id
    @ManyToOne
    @JoinColumn(name = "tableTypeId", insertable = false, updatable = false)
    private TableType tableType;


}

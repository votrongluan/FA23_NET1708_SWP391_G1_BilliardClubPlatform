package com.example.BBP_Backend.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    private Integer tableType;
    private Integer slot;
    private Integer club;

    public PriceId(int tableTypeId, int clubId, Integer slotId) {
    }
}

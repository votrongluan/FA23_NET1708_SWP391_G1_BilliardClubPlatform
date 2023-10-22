package com.example.BBP_Backend.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Embeddable
public class PriceId implements Serializable {

    private int slotId;
    private int tableTypeId;
    private int clubId;


}

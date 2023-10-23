package com.example.BBP_Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    private Integer tableType;
    private Integer slot;
    private Integer club;
}

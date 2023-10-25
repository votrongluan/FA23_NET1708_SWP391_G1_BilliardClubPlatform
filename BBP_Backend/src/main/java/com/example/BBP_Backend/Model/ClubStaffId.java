package com.example.BBP_Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubStaffId implements Serializable {
    private Integer staff;
    private Integer club;
}

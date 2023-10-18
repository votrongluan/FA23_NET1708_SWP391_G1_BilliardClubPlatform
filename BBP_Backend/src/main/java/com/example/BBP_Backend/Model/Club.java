package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Entity
@Table(name = "club")
@Data
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clubId;

    private String clubname;
    private String address;
    private int districtId;
    private String fanpageLink;
    private String avatarLink;
    private Time openTime;
    private Time closeTime;
    private String email;
    private String phone;

}
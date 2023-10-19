package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "Club")
@Data
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clubId;

    private String clubname;
    private String address;
    private String districtId;
    private String fanpageLink;
    private String avatarLink;
    private Time openTime;
    private Time closeTime;
    private String email;
    private String phone;
    
    @OneToMany(mappedBy = "clubId", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Booking> bookings;
}
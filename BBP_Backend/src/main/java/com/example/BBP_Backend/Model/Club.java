package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Club")
public class Club {
    @Id
    @GeneratedValue
    private int clubId;
    private String clubName;
    private String address;
    private int districtId;
    private String fanpageLink;
    private String avatarLink;
    private int openTime;
    private int closeTime;
    private String email;
    private String phone;
    private boolean status;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Booking> bookings;

    //Map to Price
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Price> prices;

    //Map to ClubStaff
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ClubStaff> clubStaffs;
}
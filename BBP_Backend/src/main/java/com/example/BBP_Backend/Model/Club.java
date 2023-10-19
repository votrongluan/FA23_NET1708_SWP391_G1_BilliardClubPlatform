package com.example.BBP_Backend.Model;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
=======
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.sql.Time;
>>>>>>> 69d0158f1552c2042919cbd87bf4d133ee7c22ff
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
<<<<<<< HEAD
@Table(name = "club")
=======
@Table(name = "Club")
@Data
>>>>>>> 69d0158f1552c2042919cbd87bf4d133ee7c22ff
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clubId;
    private String clubName;
    private String address;
    private String districtId;
    private String fanpageLink;
    private String avatarLink;
    private int openTime;
    private int closeTime;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "clubId", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Booking> bookings;
}
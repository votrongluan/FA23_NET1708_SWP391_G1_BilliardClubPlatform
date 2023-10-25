package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ClubStaff")
@IdClass(ClubStaffId.class)
public class ClubStaff {

    @Id
    @OneToOne
    @JoinColumn(name = "staffId", insertable = false, updatable = false)
    private User staff;

    @Id
    @ManyToOne
    @JoinColumn(name = "clubId", insertable = false, updatable = false)
    private Club club;
}

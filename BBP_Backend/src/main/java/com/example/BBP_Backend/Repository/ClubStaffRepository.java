package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.ClubStaff;
import com.example.BBP_Backend.Model.ClubStaffId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubStaffRepository extends JpaRepository<ClubStaff, ClubStaffId> {
    void deleteByStaff_Username(String username);
    @Query("select cs.club.clubId From ClubStaff cs where cs.staff.userId = :clubStaffId")
    int getClubIdByClubStaffId(int clubStaffId);
}

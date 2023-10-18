package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {
    List<Club> findByClubname(String clubname);
}

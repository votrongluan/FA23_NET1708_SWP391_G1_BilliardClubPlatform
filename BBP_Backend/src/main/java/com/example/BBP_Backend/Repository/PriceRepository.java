package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PriceRepository extends JpaRepository<Price, PriceId> {

    @Query("select p from Price p join Club c on p.club.clubId = c.clubId where p.club.clubId = :clubId")
    List<Price> getPricesByClubId(int clubId);

    List<Price> getAllByClub_ClubId(int clubId);
}

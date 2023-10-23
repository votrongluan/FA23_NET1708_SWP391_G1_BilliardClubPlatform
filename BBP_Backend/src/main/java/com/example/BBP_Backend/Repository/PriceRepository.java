package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.PriceId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PriceRepository extends JpaRepository<Price, PriceId> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Price p WHERE p.tableType.tableTypeId = :tableTypeId AND p.slot.slotId = :slotId AND p.club.clubId = :clubId")
    int deleteByClubIdAndTableTypeIdAndSlotId(int clubId, int tableTypeId, int slotId);

    @Query("SELECT p.price FROM Price p WHERE p.club.clubId = :clubId AND p.slot.slotId = :slotId AND p.tableType.tableTypeId = :tableTypeId")
    Integer findPriceByClubAndSlotAndTableType(int clubId, int slotId, int tableTypeId);

    @Query("select p from Price p join Club c on p.club.clubId = c.clubId where p.club.clubId = :clubId")
    List<Price> getPricesByClubId(int clubId);

    List<Price> getAllByClub_ClubId(int clubId);
}

package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.*;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<Price, PriceId> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Price p WHERE p.tableType.tableTypeId = :tableTypeId AND p.slot.slotId = :slotId AND p.club.clubId = :clubId")
    int deleteByClubIdAndTableTypeIdAndSlotId(int clubId, int tableTypeId, int slotId);
}



package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Price;
import com.example.BBP_Backend.Model.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceRepository extends JpaRepository<Price, PriceId> {
    List<Price> findByTableTypeTableTypeId(Integer tableTypeId);
    List<Price> findBySlotSlotId(Integer slotId);
}



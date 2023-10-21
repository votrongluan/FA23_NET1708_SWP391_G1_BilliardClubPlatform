package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {
}

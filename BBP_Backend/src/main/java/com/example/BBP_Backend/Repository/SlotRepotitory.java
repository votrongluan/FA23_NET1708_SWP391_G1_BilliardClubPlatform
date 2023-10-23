package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Slot;
import org.aspectj.weaver.patterns.ConcreteCflowPointcut;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepotitory extends JpaRepository<Slot, String> {
}

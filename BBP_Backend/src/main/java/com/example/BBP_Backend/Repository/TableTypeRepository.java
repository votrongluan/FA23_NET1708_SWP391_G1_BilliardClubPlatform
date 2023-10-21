package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.TableType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableTypeRepository extends JpaRepository<TableType, Integer> {
}

package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.MyTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<MyTable, Integer> {
}

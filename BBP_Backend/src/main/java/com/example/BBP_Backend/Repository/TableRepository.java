package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.MyTable;
import jakarta.persistence.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<MyTable, Integer> {
    List<MyTable> getAllByClubId(int clubId);
    MyTable findByTableId(int tableId);
}

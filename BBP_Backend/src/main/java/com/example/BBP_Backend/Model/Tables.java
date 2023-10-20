package com.example.BBP_Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
@Entity
@Data
@jakarta.persistence.Table(name = "Table")
public class Tables {
    @Id
    @GeneratedValue
    private int tableId;

    @ManyToOne()
    @JoinColumn(name = "table_type_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private TableType tableTypeId;
    private int clubId;
    private int is_available;

}

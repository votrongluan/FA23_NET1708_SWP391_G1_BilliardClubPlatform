package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import java.util.List;


@Entity
@Data
@RequiredArgsConstructor
@Table(name = "TableType")
public class TableType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tableTypeId;

    private String typeName;
    private String typeDescription;
    @OneToMany(mappedBy = "tableType", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<MyTable> tables;

    @OneToMany(mappedBy = "tableType", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Price> prices;
}

package com.example.BBP_Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@RequiredArgsConstructor
@jakarta.persistence.Table(name = "tableType")
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
    private List<Table> tables;

    @OneToMany(mappedBy = "tableType", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Price> prices;

}

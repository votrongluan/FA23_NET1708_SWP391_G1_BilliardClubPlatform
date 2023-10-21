package com.example.BBP_Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BookingDetail")
public class BookingDetail {

    @Id
    @GeneratedValue
    private int bookingDetailId;

    private int bookingId;

    private int slotId;

    private int price;

    private Date bookDate;
}

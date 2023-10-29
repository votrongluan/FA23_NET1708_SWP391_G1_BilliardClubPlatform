package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.Club;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {
    List<Club> findByClubName(String clubname);
    Club findByClubId(int clubId);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM BookingDetail WHERE bookingId IN (SELECT bookingId FROM Booking WHERE clubId = :clubId);", nativeQuery = true)
    void deleteBookingDetailsByClubId(int clubId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Booking WHERE clubId = :clubId", nativeQuery = true)
    void deleteBookingsByClubId(int clubId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Price WHERE clubId = :clubId", nativeQuery = true)
    void deletePricesByClubId(int clubId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM ClubStaff WHERE clubId = :clubId", nativeQuery = true)
    void deleteClubStaffsByClubId(int clubId);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM [Table] WHERE clubId = :clubId", nativeQuery = true)
    void deleteTableByClubId(int clubId);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM BookingDetail\n" +
            "WHERE tableId IN (\n" +
            "    SELECT tableId\n" +
            "    FROM [Table]\n" +
            "    WHERE clubId = :clubId\n" +
            ");", nativeQuery = true)
    void deleteTableBookingDetailsByClubId(int clubId);
}

package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.*;
import com.example.BBP_Backend.Repository.*;
import com.example.BBP_Backend.Response.ClubWithRating;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClubService {
    private final ClubRepository clubRepository;

    public List<Club> findAllClubs() {
        return clubRepository.findAll();
    }

    public int getClubNoRatingById(int clubId) {
        Optional<Club> club = findClubById(clubId);
        int noRating = 0;
        if (club.isPresent()) {
            for (Booking booking: club.get().getBookings()) {
                if (booking.getReview() != null) {
                    noRating++;
                }
            }
            return noRating;
        }
        return -1;
    }

    public double getClubAvgRatingById(int clubId) {
        Optional<Club> club = findClubById(clubId);
        int noRating = 0;
        double totalRating = 0;
        if (club.isPresent()) {
            for (Booking booking: club.get().getBookings()) {
                if (booking.getReview() != null) {
                    noRating++;
                    totalRating += booking.getReview().getStar();
                }
            }
            return noRating == 0 ? 0 : totalRating / noRating;
        }
        return -1;
    }

    public ClubWithRating getClubWithRatingById(Integer clubId) {
        Optional<Club> optionalClub = clubRepository.findById(clubId);
        if (optionalClub.isPresent()) {
            Club club = optionalClub.get();
            int noRating = getClubNoRatingById(club.getClubId());
            double rating = getClubAvgRatingById(club.getClubId());
            return new ClubWithRating(
                    club,
                    club.getBookings().size(),
                    noRating,
                    rating
            );
        } else {
            return null; // or throw an exception, depending on your requirement
        }
    }

    public List<ClubWithRating> getAllClubWithRating() {
        List<Club> clubs = findAllClubs();
        List<ClubWithRating> clubsWithRating = new ArrayList<>();
        for (Club club: clubs) {
            int noRating = getClubNoRatingById(club.getClubId());
            double rating = getClubAvgRatingById(club.getClubId());
            clubsWithRating.add(
                    new ClubWithRating(
                            club,
                            club.getBookings().size(),
                            noRating,
                            rating
                    ));
//                    new ClubWithRating(
//                            club,
//                            club.getBookings().size()
//                    ));
        }
        return clubsWithRating;
    }

    public Optional<Club> findClubById(Integer clubId) {
        return clubRepository.findById(clubId);
    }

    public List<Club> findByClubname(Club newClub) {
        return clubRepository.findByClubName(newClub.getClubName());
    }
    public Club saveNewClub(Club newClub) {
        return clubRepository.save(newClub);
    }
    public Optional<Club> updateClub(Integer clubId, Club newClub) {
        Optional<Club> existingClub = clubRepository.findById(clubId);
            Club updatedClub;
            if (existingClub.isPresent()) {
                updatedClub = existingClub.get();
                updatedClub.setClubName(newClub.getClubName());
                updatedClub.setAddress(newClub.getAddress());
                updatedClub.setDistrictId(newClub.getDistrictId());
                updatedClub.setFanpageLink(newClub.getFanpageLink());
                updatedClub.setAvatarLink(newClub.getAvatarLink());
                updatedClub.setOpenTime(newClub.getOpenTime());
                updatedClub.setCloseTime(newClub.getCloseTime());
                updatedClub.setEmail(newClub.getEmail());
                updatedClub.setPhone(newClub.getPhone());
                updatedClub.setStatus(newClub.isStatus());
            } else {
                newClub.setClubId(clubId);
                updatedClub = newClub;
            }
            return Optional.of(clubRepository.save(updatedClub));
        }

    public boolean existsById(Integer clubId) {
        return clubRepository.existsById(clubId);
    }

    public void deleteById(Integer clubId) {
        clubRepository.deleteById(clubId);
    }

    public void deleteClub(int clubId) {
        clubRepository.deleteBookingDetailsByClubId(clubId);
        clubRepository.deleteTableBookingDetailsByClubId(clubId);
        clubRepository.deleteBookingsByClubId(clubId);
        clubRepository.deletePricesByClubId(clubId);
        clubRepository.deleteClubStaffsByClubId(clubId);
        clubRepository.deleteTableByClubId(clubId);
        clubRepository.deleteById(clubId);
    }
}

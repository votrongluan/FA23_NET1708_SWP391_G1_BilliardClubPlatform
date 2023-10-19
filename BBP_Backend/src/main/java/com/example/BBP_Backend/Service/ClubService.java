package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Repository.ClubRepository;
import com.example.BBP_Backend.Response.ClubWithRating;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Data
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
        if (!club.isEmpty()) {
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
        if (!club.isEmpty()) {
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
        Club club = clubRepository.findById(clubId).get();
        int noRating = getClubNoRatingById(club.getClubId());
        double rating = getClubAvgRatingById(club.getClubId());
        return new ClubWithRating(
                        club,
                        club.getBookings().size(),
                        noRating,
                        rating);
//        return new ClubWithRating(
//                club,
//                club.getBookings().size()
//        );
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
                            club.getBookings().size() + 1,
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
        Optional<Club> foundClubs = clubRepository.findById(clubId);
        return foundClubs;
    }

    public List<Club> findByClubname(Club newClub) {
        return clubRepository.findByClubName(newClub.getClubName().trim());
    }
    public Club saveNewClub(Club newClub) {
        return clubRepository.save(newClub);
    }
    public Optional<Club> updateClub(Club newClubEntity, Integer clubId) {
        List<Club> foundClubs = clubRepository.findByClubName(newClubEntity.getClubName().trim());
        Optional<Club> existingClub = clubRepository.findById(clubId);

        if (foundClubs.size() > 0) {
            return Optional.empty();
        } else {
            Club updatedClub;
            if (existingClub.isPresent()) {
                updatedClub = existingClub.get();
                updatedClub.setClubName(newClubEntity.getClubName());
                updatedClub.setAddress(newClubEntity.getAddress());
                updatedClub.setDistrictId(newClubEntity.getDistrictId());
                updatedClub.setFanpageLink(newClubEntity.getFanpageLink());
                updatedClub.setAvatarLink(newClubEntity.getAvatarLink());
                updatedClub.setOpenTime(newClubEntity.getOpenTime());
                updatedClub.setCloseTime(newClubEntity.getCloseTime());
                updatedClub.setEmail(newClubEntity.getEmail());
                updatedClub.setPhone(newClubEntity.getPhone());
            } else {
                newClubEntity.setClubId(clubId);
                updatedClub = newClubEntity;
            }

            return Optional.of(clubRepository.save(updatedClub));
        }
    }

    public boolean existsById(Integer clubId) {
        return clubRepository.existsById(clubId);
    }

    public void deleteById(Integer clubId) {
        clubRepository.deleteById(clubId);
    }


}

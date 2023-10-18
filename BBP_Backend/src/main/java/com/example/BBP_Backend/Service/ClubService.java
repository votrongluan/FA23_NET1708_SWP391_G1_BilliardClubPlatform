package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Model.ResponeObject;
import com.example.BBP_Backend.Repository.ClubRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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
    public Optional<Club> findClubById(Integer clubId) {
        Optional<Club> foundClubs = clubRepository.findById(clubId);
        return foundClubs;
    }
    public List<Club> findByClubname(Club newClub) {
        return clubRepository.findByClubname(newClub.getClubname().trim());
    }
    public Club saveNewClub(Club newClub) {
        return clubRepository.save(newClub);
    }
    public Optional<Club> updateClub(Club newClubEntity, Integer clubId) {
        List<Club> foundClubs = clubRepository.findByClubname(newClubEntity.getClubname().trim());
        Optional<Club> existingClub = clubRepository.findById(clubId);

        if (foundClubs.size() > 0) {
            return Optional.empty();
        } else {
            Club updatedClub;
            if (existingClub.isPresent()) {
                updatedClub = existingClub.get();
                updatedClub.setClubname(newClubEntity.getClubname());
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

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
}

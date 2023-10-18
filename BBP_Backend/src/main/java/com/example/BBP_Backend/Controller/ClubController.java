package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Model.ResponeObject;
import com.example.BBP_Backend.Repository.ClubRepository;
import com.example.BBP_Backend.Service.ClubService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;


    @GetMapping("/club")
    public List<Club> getClubList() {

        return clubService.findAllClubs();
    }

    //    @GetMapping("/club/{clubId}")
//    ResponseEntity<ResponeObject> findClubById(@PathVariable Integer clubId) {
//        Optional<Club> foundClubs = clubRepository.findById(clubId);
//        return foundClubs.isPresent() ? ResponseEntity.status(HttpStatus.OK).body(
//                new ResponeObject("Ok", "Query club successfully", foundClubs)
//        ) :
//                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                        new ResponeObject("Failed", "cannot find club with id = " + clubId,
//                                "")
//                );
//    }
    @GetMapping("/club/{clubId}")
    ResponseEntity<ResponeObject> findClubById(@PathVariable Integer clubId) {
        Optional<Club> foundClubs = clubService.findClubById(clubId);
        return foundClubs.isPresent() ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("Ok", "Query club successfully", foundClubs)
        ) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("Failed", "cannot find club with id = " + clubId,
                                "")
                );
    }

//    @PostMapping("/clubInsert")
//    ResponseEntity<ResponeObject> insertClub(@RequestBody Club newClubEntity) {
//        List<Club> foundClubs = clubRepository.findByClubname(newClubEntity.getClubname().trim());
//        return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                new ResponeObject("Failed", "Club Name already taken", "")
//        ) :
//                ResponseEntity.status(HttpStatus.OK).body(
//                        new ResponeObject("Ok", "Insert Club Successfully",
//                                clubRepository.save(newClubEntity))
//                );
//    }
//
//
//    @PutMapping("/updateClub/{clubId}")
//    ResponseEntity<ResponeObject> updateClub(@RequestBody Club newClubEntity,
//                                             @PathVariable Integer clubId) {
//        List<Club> foundClubs = clubRepository.findByClubname(newClubEntity.getClubname().trim());
//        Optional<Object> updateClub = Optional.of(clubRepository.findById(clubId)
//                .map(club -> {
//                    club.setClubname(newClubEntity.getClubname());
//                    club.setAddress(newClubEntity.getAddress());
//                    club.setDistrictId(newClubEntity.getDistrictId());
//                    club.setFanpageLink(newClubEntity.getFanpageLink());
//                    club.setAvatarLink(newClubEntity.getAvatarLink());
//                    club.setOpenTime(newClubEntity.getOpenTime());
//                    club.setCloseTime(newClubEntity.getCloseTime());
//                    club.setEmail(newClubEntity.getEmail());
//                    club.setPhone(newClubEntity.getPhone());
//                    return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                            new ResponeObject("Failed", "Club Name already taken", "")
//                    ) :
//                            clubRepository.save(club);
//                }).orElseGet(() -> {
//                    newClubEntity.setClubId(clubId);
//                    return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                            new ResponeObject("Failed", "Club Name already taken", "")
//                    ) :
//                            clubRepository.save(newClubEntity);
//                }));
//        return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                new ResponeObject("Failed", "Club Name already taken", "")
//        ) :
//                ResponseEntity.status(HttpStatus.OK).body(
//                        new ResponeObject("Ok", "Update Club Successfully",
//                                updateClub)
//                );
//    }
//
//    @DeleteMapping("/deleteClub/{clubId}")
//    ResponseEntity<ResponeObject> deleteClub(@PathVariable Integer clubId) {
//        boolean exists = clubRepository.existsById(clubId);
//        if (exists) {
//            clubRepository.deleteById(clubId);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponeObject("Ok", "Delete Club Successfully", ""));
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                new ResponeObject("Failed", "Cannot find Club to delete", "")
//        );
//    }

}

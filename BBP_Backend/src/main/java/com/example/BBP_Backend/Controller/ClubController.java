package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Booking;
import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Model.ResponeObject;
import com.example.BBP_Backend.Response.ClubWithRating;
import com.example.BBP_Backend.Service.ClubService;
import lombok.RequiredArgsConstructor;
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

<<<<<<< HEAD
    @GetMapping("/club")
    public ResponseEntity<ResponeObject> getClubById(
            @RequestBody Club club) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("OK", "ClubById", clubService.getClubWithRatingById(club.getClubId()))
        );
    }

    @GetMapping("/allClubs")
    public ResponseEntity<ResponeObject> getClubList() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("OK", "ListClub", clubService.getAllClubWithRating())
        );
=======
    @GetMapping("/allClubs")
    public ResponseEntity<ResponeObject> getClubList() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("OK", "Query club successfully", clubService.getAllClubWithRating())
        );
    }

//    @GetMapping("/club")
//    public List<Club> getClubList() {
//
//        return clubService.findAllClubs();
//    }

    @GetMapping("/club/{clubId}")
    ResponseEntity<ResponeObject> findClubById(@PathVariable Integer clubId,
                                               @RequestBody Club club) {
        Optional<Club> foundClubs = clubService.findClubById(clubId);
        return foundClubs.isPresent() ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("Ok", "Query club successfully", clubService.getClubWithRatingById(club.getClubId()))
        ) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("Failed", "cannot find club with id = " + clubId,
                                "")
                );
>>>>>>> 69d0158f1552c2042919cbd87bf4d133ee7c22ff
    }

    @PostMapping("/clubInsert")
    ResponseEntity<ResponeObject> insertClub(@RequestBody Club newClub) {
        List<Club> foundClubs = clubService.findByClubname(newClub);
        return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponeObject("Failed", "Club Name already taken", "")
        ) :
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("Ok", "Insert Club Successfully",
                                clubService.saveNewClub(newClub))
                );
    }


    @PutMapping("/updateClub/{clubId}")
    public ResponseEntity<ResponeObject> updateClub(@RequestBody Club newClubEntity,
                                                    @PathVariable Integer clubId) {
        Optional<Club> updatedClub = clubService.updateClub(newClubEntity, clubId);
        if (updatedClub.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("Ok", "Update Club Successfully", updatedClub.get())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponeObject("Failed", "Club Name already taken", "")
            );
        }
    }

    @DeleteMapping("/deleteClub/{clubId}")
    public ResponseEntity<ResponeObject> deleteClub(@PathVariable Integer clubId) {
        boolean exists = clubService.existsById(clubId);
        if (exists) {
            clubService.deleteById(clubId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("Ok", "Delete Club Successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponeObject("Failed", "Cannot find Club to delete with id = " + clubId, "")
        );
    }

}

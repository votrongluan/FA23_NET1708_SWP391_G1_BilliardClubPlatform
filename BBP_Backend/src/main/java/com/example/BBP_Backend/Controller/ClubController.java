package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Response.ClubWithRating;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.ClubService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;

    @GetMapping("/club")
    public ResponseEntity<ResponseObject> getClubById(
            @RequestBody JsonNode club) {
        Integer clubId = club.get("clubId").asInt();
        ClubWithRating foundClub = clubService.getClubWithRatingById(clubId);
        if(foundClub != null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Query club successfully", foundClub)
            );
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Cannot find club with id = " + clubId, "")
            );
        }
    }

    @GetMapping("/allClubs")
    public ResponseEntity<ResponseObject> getClubList() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query Club Successfully", clubService.getAllClubWithRating())
        );
    }

    @PostMapping("/clubInsert")
    ResponseEntity<ResponseObject> insertClub(@RequestBody Club newClub) {
        List<Club> foundClubs = clubService.findByClubname(newClub);
        return foundClubs.size() > 0 ? ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("Failed", "Club Name already taken", "")
        ) :
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("Ok", "Insert Club Successfully",
                                clubService.saveNewClub(newClub))
                );
    }

    @PutMapping("/updateClub")
    public ResponseEntity<ResponseObject> updateClub(@RequestBody Club club) {
        Integer clubId = club.getClubId();

        Optional<Club> updatedClub = clubService.updateClub(clubId, club);

        if (updatedClub.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Update Club Successfully", updatedClub.get())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", "Cannot Update Club with id = " + clubId, "")
            );
        }
    }

    @DeleteMapping("/deleteClub")
    public ResponseEntity<ResponseObject> deleteClub(@RequestBody Club club) {
        Integer clubId = club.getClubId();

        boolean exists = clubService.existsById(clubId);

        if (exists) {
            clubService.deleteById(clubId);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Delete Club Successfully", "")
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("Failed", "Cannot find Club to delete with id = " + clubId, "")
        );
    }

}

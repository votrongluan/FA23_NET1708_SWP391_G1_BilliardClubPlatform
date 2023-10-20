package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Response.ResponseObject;
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

    @GetMapping("/club")
    public ResponseEntity<ResponseObject> getClubById(
            @RequestBody Club club) {
        ClubWithRating foundClub = clubService.getClubWithRatingById(club.getClubId());
        if(foundClub != null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Query club successfully", foundClub)
            );
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Cannot find club with id = " + club.getClubId(), "")
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

    @PutMapping("/updateClub/{clubId}")
    public ResponseEntity<ResponseObject> updateClub(@RequestBody Club newClubEntity,
                                                     @PathVariable Integer clubId) {
        Optional<Club> updatedClub = clubService.updateClub(newClubEntity, clubId);
        if (updatedClub.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Update Club Successfully", updatedClub.get())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", "Cannot Update Club with id = " +clubId, "")
            );
        }
    }

    @DeleteMapping("/deleteClub/{clubId}")
    public ResponseEntity<ResponseObject> deleteClub(@PathVariable Integer clubId) {
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

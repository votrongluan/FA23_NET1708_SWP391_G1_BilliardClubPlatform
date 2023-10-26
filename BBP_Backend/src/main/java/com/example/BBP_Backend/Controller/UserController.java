package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Request.UpdatePasswordRequest;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Response.StaffInfoResponse;
import com.example.BBP_Backend.Service.UserService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<ResponseObject> updateUserInformation(
            @PathVariable("userId") int userId,
            @RequestBody UserUpdateRequest updatedUser
    ) {
        User updatedUserInfo = userService.updateUserInformation(userId, updatedUser);
        if (updatedUserInfo != null) {
            return ResponseEntity.ok(
                    new ResponseObject("Ok", "Update information successfully", updatedUserInfo));
        } else {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("Failed", "Can not find !!!", "")
            );
        }
    }

    @PutMapping("/updatePassword/{userId}")
    public ResponseEntity<ResponseObject> updatePassword(@PathVariable(name = "userId") int userId,
                                                         @RequestBody UpdatePasswordRequest update
    ) {
        String status = userService.updateUserPassword(userId, update);
        if (status.equals("Succesful")) {
            return ResponseEntity.ok(new ResponseObject(
                    "Ok", "Update password successfully!", ""
            ));
        }
//        if (status.equals("Failed")) {
//            return ResponseEntity.badRequest().body(new ResponseObject(
//                    "Failed", "Can not update password!!!", "")
//            );
//        }
         if(status.equals("samePassword")) {
            return ResponseEntity.badRequest().body(new ResponseObject(
                    "Failed", "Same password!!!", "")
            );
        }
         return  ResponseEntity.badRequest().body(new ResponseObject(
                    "Failed", "Can not find User!!!", ""));
    }
@GetMapping("/getAllStaff")
    public ResponseEntity<List<StaffInfoResponse>> getAllStaff(){
        List<StaffInfoResponse> staffs = userService.getAllStaff();
        if(staffs != null){
            return ResponseEntity.ok(staffs);
        }else{
            return ResponseEntity.badRequest().body(staffs);
        }

    }

}



        






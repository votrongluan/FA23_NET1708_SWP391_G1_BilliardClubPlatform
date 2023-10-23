package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
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
                    new ResponseObject("Ok", "Update information successfully",updatedUserInfo));
        } else {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("Failed", "Can not find !!!", "")
            );
        }
    }
//    @PutMapping("/updateUser2/{userId}")
//    public ResponseEntity<User> updateUserInformation2(
//            @PathVariable("userId") int userId,
//            @RequestBody UserUpdateRequest updatedUser
//    ) {
//        User updatedUserInfo = userService.updateUserInformation(userId, updatedUser);
//        if (updatedUserInfo != null) {
//            return ResponseEntity.ok(updatedUserInfo);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}

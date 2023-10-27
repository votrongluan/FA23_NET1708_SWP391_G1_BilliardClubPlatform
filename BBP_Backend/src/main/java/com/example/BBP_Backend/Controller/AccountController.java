package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Request.AccountRequest;
import com.example.BBP_Backend.Response.AccountResponse;
import com.example.BBP_Backend.Response.ResponseObject;
import com.example.BBP_Backend.Service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @GetMapping()
    public ResponseEntity<ResponseObject> timezone() {
        ZoneId defaultZoneId = ZoneId.systemDefault();
        return ResponseEntity.ok(
                new ResponseObject("","",defaultZoneId)
        );
    }

    @DeleteMapping("/deleteStaffAccount")
    public ResponseEntity<ResponseObject> deleteStaff(
            @RequestBody AccountRequest request
    ) {
        try {
            return ResponseEntity.ok().body(
                    new ResponseObject(
                            "Ok",
                            "Delete account successfully",
                            service.deleteStaffByUsername(request.getUsername())
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.ofNullable(
                    new ResponseObject(
                            "Exception",
                            ex.getMessage(),
                            null
                    )
            );
        }
    }

    @PostMapping("/addNewStaff")
    public ResponseEntity<ResponseObject> addNewStaff(
            @RequestBody AccountRequest request
    ) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            return ResponseEntity.ok(
                    new ResponseObject(
                            "",
                            "",
                            service.addNewStaff(request)
                    )
            );
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject(
                            "Exception",
                            ex.getMessage(),
                            null
                    )
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AccountResponse> login(
            @RequestBody AccountRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AccountResponse> register(
            @RequestBody AccountRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

//    @GetMapping("/logout")
//    public ResponseEntity<AccountResponse> logout(
//            @RequestBody AccountRequest request) {
//        return ResponseEntity.ok(service.logout(request));
//    }
}

package com.example.BBP_Backend.Controller;

import com.example.BBP_Backend.Service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @GetMapping("/login")
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

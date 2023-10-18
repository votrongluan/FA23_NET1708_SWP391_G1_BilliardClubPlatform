package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Request.AccountRequest;
import com.example.BBP_Backend.Response.AccountResponse;
import com.example.BBP_Backend.Enum.Role;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AccountResponse register(AccountRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .phone(request.getPhone())
                .avatarLink(request.getAvatarLink())
                .role(Role.CUSTOMER)
                .build();
        if(repository.findByUsername(user.getUsername()).isEmpty()) {
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AccountResponse.builder()
                    .accessToken(jwtToken)
                    .role(user.getRole())
                    .status(true)
                    .message("Ok")
                    .build();
        }
        return AccountResponse.builder()
                .status(false)
                .message("Existed account")
                .build();
    }

    public AccountResponse login(AccountRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AccountResponse.builder()
                .accessToken(jwtToken)
                .role(user.getRole())
                .status(true)
                .message("Ok")
                .build();
    }

//    public AccountResponse authenticate(AccountService request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUsername(),
//                        request.getPassword()
//                )
//        );
//        var user = repository.findByUsername(request.getUsername())
//                .orElseThrow();
//        var jwtToken = jwtService.generateToken(user);
//        return AccountResponse.builder()
//                .accessToken(jwtToken)
//                .build();
//    }
}

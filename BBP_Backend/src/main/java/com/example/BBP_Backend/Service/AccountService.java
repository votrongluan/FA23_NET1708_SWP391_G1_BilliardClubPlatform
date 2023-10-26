package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.Club;
import com.example.BBP_Backend.Model.ClubStaff;
import com.example.BBP_Backend.Model.ClubStaffId;
import com.example.BBP_Backend.Repository.ClubRepository;
import com.example.BBP_Backend.Repository.ClubStaffRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final ClubStaffRepository clubStaffRepository;
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
        if (userRepository.findByUsername(user.getUsername()).isEmpty()) {
            userRepository.save(user);
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
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        if(user.getRole().getRole().equals("Staff")){
            return AccountResponse.builder()
                    .accessToken(jwtToken)
                    .role(user.getRole())
                    .status(true)
                    .message("Ok")
                    .id(user.getUserId())
                    .username(user.getUsername())
                    .avatarLink(user.getAvatarLink())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .clubId(clubStaffRepository.getClubIdByClubStaffId(user.getUserId()))
                    .build();
        }
        return AccountResponse.builder()
                .accessToken(jwtToken)
                .role(user.getRole())
                .status(true)
                .message("Ok")
                .id(user.getUserId())
                .username(user.getUsername())
                .avatarLink(user.getAvatarLink())
                .email(user.getEmail())
                .phone(user.getPhone())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

    public AccountResponse addNewStaff(AccountRequest request) {
        Club club = clubRepository.findByClubId(request.getClubId());
        if (club != null) {
            if (!userRepository.findByUsername(request.getUsername()).isPresent()) {
                var user = User.builder()
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .avatarLink(request.getAvatarLink())
                        .role(Role.STAFF)
                        .build();

                userRepository.save(user);
                clubStaffRepository.save(
                        ClubStaff.builder()
                                .club(club)
                                .staff(userRepository.findById(user.getUserId()).get())
                                .build()
                );
                var jwtToken = jwtService.generateToken(user);
                return AccountResponse.builder()
                        .accessToken(jwtToken)
                        .role(user.getRole())
                        .status(true)
                        .message("New staff is successfully added")
                        .build();
            }
            return AccountResponse.builder()
                    .status(false)
                    .message("Existed username")
                    .build();
        }
        return AccountResponse.builder()
                .status(false)
                .message("Non existed club")
                .build();
    }

    @Transactional
    public User deleteStaffByUsername(String username) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new Exception("Account do not exists!!!");
        }
        clubStaffRepository.deleteByStaff_Username(username);
        userRepository.deleteByUsername(username);
        return user.get();
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

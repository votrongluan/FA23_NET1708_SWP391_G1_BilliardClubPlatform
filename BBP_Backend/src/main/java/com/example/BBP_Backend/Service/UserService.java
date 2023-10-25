package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.ClubStaff;
import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Repository.ClubStaffRepository;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Request.UpdatePasswordRequest;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import com.example.BBP_Backend.Response.StaffInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClubStaffRepository clubStaffRepository;

    public User updateUserInformation(int userId, UserUpdateRequest updatedUser) {
        User currentUser = userRepository.getById(userId);

        if (currentUser != null) {

            currentUser.setFirstName(updatedUser.getFirstName());
            currentUser.setLastName(updatedUser.getLastName());
            currentUser.setEmail(updatedUser.getEmail());
            currentUser.setPhone(updatedUser.getPhone());
            currentUser.setAvatarLink(updatedUser.getAvatarLink());

            return userRepository.save(currentUser);
        }
        return null;
    }

    public String updateUserPassword(int userId, UpdatePasswordRequest update) {
        User user = userRepository.getUserByUserId(userId);

        if (user != null && passwordEncoder.matches(update.getOldPassword(), user.getPassword())) {
            if (update.getNewPassword().equals(update.getOldPassword())) {
                return "samePassword";
            } else {
                user.setPassword(passwordEncoder.encode(update.getNewPassword()));
                userRepository.save(user);
                return "Succesful";
            }
        }

        return "Failed";
    }

    public List<StaffInfoResponse> getAllStaff() {
        List<ClubStaff> clubStaffs = clubStaffRepository.findAll();
        List<StaffInfoResponse> resull = new ArrayList<>();
        for (ClubStaff ct : clubStaffs
        ) {
            resull.add(new StaffInfoResponse(
                    ct.getStaff().getFirstName(),
                    ct.getStaff().getLastName(),
                    ct.getStaff().getUsername(),
                    ct.getStaff().getPhone(),
                    ct.getClub().getClubId(),
                    ct.getClub().getClubName()
            ));

        }
        return resull;
    }

    String getUserPhone(int userId){
        User user = userRepository.getUserByUserId(userId);
        return user.getPhone();
    }
}




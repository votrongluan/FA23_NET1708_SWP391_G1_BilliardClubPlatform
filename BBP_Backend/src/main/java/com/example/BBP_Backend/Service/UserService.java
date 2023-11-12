package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.ClubStaff;
import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Repository.ClubStaffRepository;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Request.ResetPasswordRequest;
import com.example.BBP_Backend.Request.UpdatePasswordRequest;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import com.example.BBP_Backend.Response.StaffInfoResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClubStaffRepository clubStaffRepository;
    private final EmailService emailService;
    private final HttpSession httpSession;

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
    public boolean generateAndSendOTP(String userEmail) {
        // Generate a random OTP
        String otp = generateResetToken();

        // Store the OTP in the session or database for verification
        httpSession.setAttribute("otp", otp);
        httpSession.setAttribute("otpUserEmail", userEmail);
        User user = userRepository.getUserByEmail(userEmail);
        if(user != null){
        // Send the OTP to the user's email
        emailService.sendOTPByEmail(userEmail, otp);
        return  true;}
        return false;
    }
    private String generateResetToken() {
        long expirationMinutes = 5; // Set the expiration time in minutes
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(expirationMinutes);

        // Encode the expiration time and any other necessary information in the token
        // For simplicity, here we concatenate the token and expiration time

        int otpLength = 6;
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString() + "";
    }

    public boolean verifyOTP(String enteredOTP) {
        // Retrieve stored OTP from the HttpSession
        String storedOTP = (String) httpSession.getAttribute("otp");
        if(storedOTP == null){
            return false;
        }
        if(enteredOTP.equals(storedOTP)){
            httpSession.removeAttribute("otp");
            return true;
        }

      return false;
    }
    public boolean resetPassword(String email, ResetPasswordRequest req){
        User user = userRepository.getUserByEmail(email);
        if(user != null){
            if(req.getNewPassword().equals(req.getConfirmPassword())){
                user.setPassword(passwordEncoder.encode(req.getNewPassword()));
                userRepository.save(user);
                return true;
            }

            }
        return  false;
        }
    }





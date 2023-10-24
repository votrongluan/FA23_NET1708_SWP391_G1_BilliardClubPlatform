package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Request.UpdatePasswordRequest;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

        public String updateUserPassword(int userId, UpdatePasswordRequest update){
            User user = userRepository.getUserByUserId(userId);

            if(user != null && passwordEncoder.matches(update.getOldPassword(), user.getPassword())){
                if(update.getNewPassword().equals(update.getOldPassword())) {
                    return "samePassword";
                }else{
                user.setPassword(passwordEncoder.encode(update.getNewPassword()));
                userRepository.save(user);
                return "Succesful";}
            }

                return "Failed";
        }
}

package com.example.BBP_Backend.Service;

import com.example.BBP_Backend.Model.User;
import com.example.BBP_Backend.Repository.UserRepository;
import com.example.BBP_Backend.Request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

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
}

package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Enum.Role;
import com.example.BBP_Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUsername(String username);
    @Query("SELECT u from User u where u.userId = :userId")
    User getUserByUserId(int userId);
    @Query("SELECT u from User u where u.email= :email")
    User getUserByEmail(String email);

    void deleteByUsername(String username);
}

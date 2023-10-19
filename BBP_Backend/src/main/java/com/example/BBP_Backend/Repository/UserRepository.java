package com.example.BBP_Backend.Repository;

import com.example.BBP_Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

<<<<<<< HEAD
@Repository
public interface UserRepository extends JpaRepository<User,String> {
=======
public interface UserRepository extends JpaRepository<User,Integer> {
>>>>>>> 69d0158f1552c2042919cbd87bf4d133ee7c22ff

    Optional<User> findByUsername(String username);
}

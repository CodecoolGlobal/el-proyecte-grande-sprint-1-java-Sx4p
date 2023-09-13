package com.quizbuzz.backend.repository;

import com.quizbuzz.backend.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUserName(String username);
    boolean existsByUserName(String username);
}

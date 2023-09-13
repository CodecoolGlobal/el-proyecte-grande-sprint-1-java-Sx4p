package com.quizbuzz.backend.service;

import com.quizbuzz.backend.config.JwtService;
import com.quizbuzz.backend.controller.AuthenticationRequest;
import com.quizbuzz.backend.controller.RegisterRequest;
import com.quizbuzz.backend.model.user.AppUser;
import com.quizbuzz.backend.model.user.Role;
import com.quizbuzz.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    public ResponseEntity<String> userRegistration(RegisterRequest request) {
        if (!userRepository.existsByUserName(request.getUsername())) {
            String encryptedPassword = encoder.encode(request.getPassword());
            AppUser newUser = AppUser.builder().userName(request.getUsername()).password(encryptedPassword).role(Role.USER).build();
            userRepository.save(newUser);
        } else {
            return ResponseEntity.status(409).body("Already registered User!");
        }
        return ResponseEntity.ok("Successful Registration!");
    }

    public ResponseEntity<String> authenticateUserLogin(AuthenticationRequest request) {
        var authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authentication);
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String token = jwtService.generateToken(authenticate.getAuthorities(), authenticate.getName());

        return ResponseEntity.ok(token);
    }

}
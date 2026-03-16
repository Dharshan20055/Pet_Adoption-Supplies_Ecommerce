package com.petadoption.supplies.controller;


import com.petadoption.supplies.dto.request.LoginRequest;
import com.petadoption.supplies.dto.request.RegisterRequest;
import com.petadoption.supplies.dto.request.UpdateProfileRequest;
import com.petadoption.supplies.dto.response.AuthResponse;
import com.petadoption.supplies.dto.response.UserProfileResponse;
import com.petadoption.supplies.entity.User;
import com.petadoption.supplies.repository.UserRepository;
import com.petadoption.supplies.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByUsername(authentication.getName());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        UserProfileResponse profile = new UserProfileResponse();
        profile.setUsername(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setLocation(user.getLocation());
        profile.setContact(user.getContact());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByUsername(authentication.getName());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        user.setLocation(request.getLocation());
        user.setContact(request.getContact());
        userRepository.save(user);

        UserProfileResponse profile = new UserProfileResponse();
        profile.setUsername(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setLocation(user.getLocation());
        profile.setContact(user.getContact());

        return ResponseEntity.ok(profile);
    }
}


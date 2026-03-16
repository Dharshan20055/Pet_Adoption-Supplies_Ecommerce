package com.petmarketplace.controller;

import com.petmarketplace.dto.response.MessageResponse;
import com.petmarketplace.entity.User;
import com.petmarketplace.exception.ResourceNotFoundException;
import com.petmarketplace.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/users")
@Tag(name = "User Profile", description = "Profile management")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        // Mask password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> updates) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (updates.containsKey("contact"))  user.setContact(updates.get("contact"));
        if (updates.containsKey("location")) user.setLocation(updates.get("location"));
        if (updates.containsKey("email"))    user.setEmail(updates.get("email"));

        if (updates.containsKey("newPassword") && updates.containsKey("currentPassword")) {
            if (!passwordEncoder.matches(updates.get("currentPassword"), user.getPassword()))
                return ResponseEntity.badRequest().body(new MessageResponse("Current password is incorrect"));
            user.setPassword(passwordEncoder.encode(updates.get("newPassword")));
        }

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}

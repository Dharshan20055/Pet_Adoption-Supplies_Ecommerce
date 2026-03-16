package com.petmarketplace.controller;

import com.petmarketplace.entity.License;
import com.petmarketplace.entity.User;
import com.petmarketplace.exception.ResourceNotFoundException;
import com.petmarketplace.repository.LicenseRepository;
import com.petmarketplace.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/licenses")
@Tag(name = "License Management", description = "Manage seller licenses for commercial pet sales")
@SecurityRequirement(name = "bearerAuth")
public class LicenseController {

    @Autowired private LicenseRepository licenseRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping
    @Operation(summary = "Add a new license")
    public ResponseEntity<?> addLicense(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {
        User seller = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (licenseRepository.findByLicenseNumber(body.get("licenseNumber")).isPresent())
            return ResponseEntity.badRequest().body(Map.of("message", "License number already registered"));

        License license = License.builder()
                .licenseNumber(body.get("licenseNumber"))
                .issuedDate(LocalDate.parse(body.get("issuedDate")))
                .expiryDate(LocalDate.parse(body.get("expiryDate")))
                .seller(seller)
                .build();

        return ResponseEntity.ok(licenseRepository.save(license));
    }

    @GetMapping("/my")
    @Operation(summary = "Get all licenses of the current seller")
    public ResponseEntity<List<License>> getMyLicenses(@AuthenticationPrincipal UserDetails userDetails) {
        User seller = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(licenseRepository.findBySeller_UserId(seller.getUserId()));
    }

    @GetMapping("/validate/{licenseNumber}")
    @Operation(summary = "Validate a license by number")
    public ResponseEntity<?> validateLicense(@PathVariable String licenseNumber) {
        return licenseRepository.findByLicenseNumber(licenseNumber)
                .map(l -> ResponseEntity.ok(Map.of("valid", l.isValid(), "expiryDate", l.getExpiryDate())))
                .orElse(ResponseEntity.ok(Map.of("valid", false, "message", "License not found")));
    }
}

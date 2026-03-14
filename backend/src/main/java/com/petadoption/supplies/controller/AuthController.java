package com.petadoption.supplies.controller;

import com.petadoption.supplies.dto.request.LoginRequest;
import com.petadoption.supplies.dto.request.RegisterRequest;
import com.petadoption.supplies.dto.response.AuthResponse;
import com.petadoption.supplies.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request){

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request){

        return authService.login(request);
    }
}
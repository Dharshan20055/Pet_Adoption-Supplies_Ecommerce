package com.petadoption.supplies.service;

import com.petadoption.supplies.dto.request.LoginRequest;
import com.petadoption.supplies.dto.request.RegisterRequest;
import com.petadoption.supplies.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
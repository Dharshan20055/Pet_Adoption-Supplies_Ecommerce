package com.petadoption.supplies.serviceImpl;

import com.petadoption.supplies.dto.request.LoginRequest;
import com.petadoption.supplies.dto.request.RegisterRequest;
import com.petadoption.supplies.dto.response.AuthResponse;
import com.petadoption.supplies.entity.User;
import com.petadoption.supplies.exception.UserException;
import com.petadoption.supplies.repository.UserRepository;
import com.petadoption.supplies.security.JwtUtils;
import com.petadoption.supplies.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public AuthResponse register(RegisterRequest request){

        if(userRepository.existsByUsername(request.getUsername())){
            throw new UserException("Registration failed: Username already exists.");
        }

        if(userRepository.existsByEmail(request.getEmail())){
            throw new UserException("Registration failed: Email already registered.");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setContact(request.getContact());
        user.setLocation(request.getLocation());
        user.setRole("USER");

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getLocation(),
                user.getRole(),
                "User registered successfully"
        );
    }

    @Override
    public AuthResponse login(LoginRequest request){

        User user = userRepository.findByUsername(request.getUsernameOrEmail())
                .orElseThrow(() ->
                        new UserException("Login failed: User account not found."));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new UserException("Login failed: Incorrect password.");
        }

        String token = jwtUtils.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getLocation(),
                user.getRole(),
                "Login successful"
        );
    }
}
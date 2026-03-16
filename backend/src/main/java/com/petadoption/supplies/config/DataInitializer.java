package com.petadoption.supplies.config;

import com.petadoption.supplies.entity.User;
import com.petadoption.supplies.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args){

        if(userRepository.findByUsername("admin").isEmpty()){

            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@pet.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setContact("0000000000");
            admin.setLocation("System");
            admin.setRole("ADMIN");

            userRepository.save(admin);
        }
    }
}
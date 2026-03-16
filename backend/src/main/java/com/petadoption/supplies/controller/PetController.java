package com.petadoption.supplies.controller;

import com.petadoption.supplies.entity.Pet;
import com.petadoption.supplies.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "http://localhost:3000") 
public class PetController {

    @Autowired
    private PetService petService;

    @PostMapping("/add")
    public ResponseEntity<?> addPet(@RequestBody Pet pet) {
        if (pet.getPrice() != null && pet.getPrice() > 0) {
            if (pet.getLicense_id() == null) {
                return ResponseEntity.badRequest().body("Error: Commercial sales require a valid license ID.");
            }
        }
        return ResponseEntity.ok(petService.addPet(pet));
    }

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Pet>> filterPets(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(petService.filterPets(type, breed, location));
    }
}
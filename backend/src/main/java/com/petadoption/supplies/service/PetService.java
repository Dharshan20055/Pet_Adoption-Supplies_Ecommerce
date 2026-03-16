package com.petadoption.supplies.service;

import com.petadoption.supplies.entity.Pet;
import java.util.List;
import java.util.UUID;

public interface PetService {
    Pet addPet(Pet pet);
    List<Pet> getAllPets();
    List<Pet> filterPets(String type, String breed, String location);
    Pet getPetById(UUID id);
}
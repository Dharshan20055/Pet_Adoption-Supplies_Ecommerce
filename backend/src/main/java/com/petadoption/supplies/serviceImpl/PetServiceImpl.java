package com.petadoption.supplies.serviceImpl;

import com.petadoption.supplies.entity.Pet;
import com.petadoption.supplies.repository.PetRepository;
import com.petadoption.supplies.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    public Pet addPet(Pet pet) {
        if (pet.getPrice() != null && pet.getPrice() > 0) {
            if (pet.getLicense_id() == null) {
                throw new RuntimeException("Commercial sales require a valid license.");
            }
        }
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public List<Pet> filterPets(String type, String breed, String location) {
        return petRepository.findByFilters(type, breed, location);
    }

    @Override
    public Pet getPetById(UUID id) {
        return petRepository.findById(id).orElse(null);
    }
}
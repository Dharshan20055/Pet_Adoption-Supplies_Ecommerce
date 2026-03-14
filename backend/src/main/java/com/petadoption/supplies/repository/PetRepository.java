package com.petadoption.supplies.repository;

import com.petadoption.supplies.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface PetRepository extends JpaRepository<Pet, UUID> {
    
    @Query("SELECT p FROM Pet p WHERE " +
           "(:type IS NULL OR p.type = :type) AND " +
           "(:breed IS NULL OR p.breed = :breed) AND " +
           "(:location IS NULL OR p.location = :location)")
    List<Pet> findByFilters(@Param("type") String type, 
                            @Param("breed") String breed, 
                            @Param("location") String location);
}
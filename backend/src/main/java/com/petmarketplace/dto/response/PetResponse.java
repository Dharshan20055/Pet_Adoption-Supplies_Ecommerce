package com.petmarketplace.dto.response;

import com.petmarketplace.entity.Pet;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PetResponse {
    private Long petId;
    private Long sellerId;
    private String sellerUsername;
    private String breed;
    private Integer age;
    private String description;
    private String category;
    private Pet.PetType type;
    private BigDecimal price;
    private Boolean availability;
    private String location;
    private String imageUrl;
    private LocalDateTime createdAt;

    public static PetResponse fromEntity(Pet pet) {
        PetResponse r = new PetResponse();
        r.setPetId(pet.getPetId());
        r.setSellerId(pet.getSeller().getUserId());
        r.setSellerUsername(pet.getSeller().getUsername());
        r.setBreed(pet.getBreed());
        r.setAge(pet.getAge());
        r.setDescription(pet.getDescription());
        r.setCategory(pet.getCategory());
        r.setType(pet.getType());
        r.setPrice(pet.getPrice());
        r.setAvailability(pet.getAvailability());
        r.setLocation(pet.getLocation());
        r.setImageUrl(pet.getImageUrl());
        r.setCreatedAt(pet.getCreatedAt());
        return r;
    }
}

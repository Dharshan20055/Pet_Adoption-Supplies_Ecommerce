package com.petmarketplace.dto.request;

import com.petmarketplace.entity.Pet;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PetRequest {
    @NotBlank
    private String breed;

    private Integer age;
    private String description;
    private String category;

    @NotNull
    private Pet.PetType type;

    private BigDecimal price;
    private Long licenseId;
    private String location;
    private String imageUrl;
}

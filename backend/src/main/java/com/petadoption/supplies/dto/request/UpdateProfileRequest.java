package com.petadoption.supplies.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    
    @NotBlank(message = "Location cannot be blank")
    private String location;

    @NotBlank(message = "Contact cannot be blank")
    private String contact;
}
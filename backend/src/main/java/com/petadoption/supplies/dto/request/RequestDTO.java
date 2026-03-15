package com.petadoption.supplies.dto.request;

import java.util.UUID;

import lombok.Data;

@Data
public class RequestDTO {

    private UUID buyerId;
    private UUID petId;
    private String description;
    private String type;

}
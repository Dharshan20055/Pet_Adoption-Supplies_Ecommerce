package com.petadoption.supplies.dto.request;

import java.util.UUID;

import lombok.Data;

@Data
public class CartRequestDTO {

    private UUID buyerId;
    private UUID petId;
    private UUID supplyId;

}
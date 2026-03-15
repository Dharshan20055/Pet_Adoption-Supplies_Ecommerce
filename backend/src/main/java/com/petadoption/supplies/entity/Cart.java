package com.petadoption.supplies.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name="cart")
@Schema(description="Cart entity for storing buyer cart items")
public class Cart {

    @Id
    private UUID cartId;

    private UUID buyerId;

    private UUID petId;

    private UUID supplyId;

    private LocalDateTime addedDate;
}
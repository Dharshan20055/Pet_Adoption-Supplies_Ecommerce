package com.petadoption.supplies.repository;

import com.petadoption.supplies.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {

    List<Cart> findByBuyerId(UUID buyerId);

}
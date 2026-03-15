package com.petadoption.supplies.service;

import java.util.List;
import java.util.UUID;

import com.petadoption.supplies.dto.request.CartRequestDTO;
import com.petadoption.supplies.entity.Cart;

public interface CartService {

    String addToCart(CartRequestDTO dto);

    List<Cart> getCartByBuyer(UUID buyerId);

    String removeCart(UUID cartId);
    String checkout(UUID buyerId);

}
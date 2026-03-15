package com.petadoption.supplies.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petadoption.supplies.dto.request.CartRequestDTO;
import com.petadoption.supplies.entity.Cart;
import com.petadoption.supplies.service.CartService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public String addToCart(@RequestBody CartRequestDTO dto){
        return cartService.addToCart(dto);
    }

    @GetMapping("/{buyerId}")
    public List<Cart> getCart(@PathVariable UUID buyerId){
        return cartService.getCartByBuyer(buyerId);
    }

    @PostMapping("/checkout/{buyerId}")
    public String checkout(@PathVariable UUID buyerId){
        return cartService.checkout(buyerId);
    }
    @DeleteMapping("/remove/{cartId}")
    public String removeCart(@PathVariable UUID cartId){
        return cartService.removeCart(cartId);
    }
}
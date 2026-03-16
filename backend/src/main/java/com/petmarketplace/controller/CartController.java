package com.petmarketplace.controller;

import com.petmarketplace.dto.response.MessageResponse;
import com.petmarketplace.entity.*;
import com.petmarketplace.exception.ResourceNotFoundException;
import com.petmarketplace.repository.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@Tag(name = "Cart", description = "Buyer cart management")
@SecurityRequirement(name = "bearerAuth")
public class CartController {

    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private PetRepository petRepository;
    @Autowired private UserRepository userRepository;

    private User getUser(UserDetails ud) {
        return userRepository.findByUsername(ud.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a pet to cart")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Long> body) {
        User buyer = getUser(userDetails);
        Long petId = body.get("petId");
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found: " + petId));

        if (!pet.getAvailability())
            return ResponseEntity.badRequest().body(new MessageResponse("Pet is no longer available"));

        if (cartItemRepository.findByBuyer_UserIdAndPet_PetId(buyer.getUserId(), petId).isPresent())
            return ResponseEntity.badRequest().body(new MessageResponse("Pet already in cart"));

        CartItem item = CartItem.builder().buyer(buyer).pet(pet).build();
        cartItemRepository.save(item);
        return ResponseEntity.ok(new MessageResponse("Added to cart"));
    }

    @GetMapping("/{buyerId}")
    @Operation(summary = "View cart items for a buyer")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long buyerId) {
        return ResponseEntity.ok(cartItemRepository.findByBuyer_UserId(buyerId));
    }

    @DeleteMapping("/remove/{itemId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<?> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long itemId) {
        User buyer = getUser(userDetails);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!item.getBuyer().getUserId().equals(buyer.getUserId()))
            return ResponseEntity.status(403).body(new MessageResponse("Not authorized"));
        cartItemRepository.delete(item);
        return ResponseEntity.ok(new MessageResponse("Item removed from cart"));
    }

    @PostMapping("/checkout")
    @Operation(summary = "Checkout cart - converts cart items to requests")
    public ResponseEntity<?> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        User buyer = getUser(userDetails);
        List<CartItem> items = cartItemRepository.findByBuyer_UserId(buyer.getUserId());
        if (items.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Cart is empty"));

        cartItemRepository.deleteByBuyer_UserId(buyer.getUserId());
        return ResponseEntity.ok(Map.of(
            "message", "Checkout successful. Submit requests for each pet.",
            "petIds", items.stream().map(i -> i.getPet().getPetId()).toList()
        ));
    }
}

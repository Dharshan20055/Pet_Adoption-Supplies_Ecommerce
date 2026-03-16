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

@RestController
@RequestMapping("/orders")
@Tag(name = "Orders", description = "Order management for sellers and buyers")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    @Autowired private OrderRepository orderRepository;
    @Autowired private UserRepository userRepository;

    private User getUser(UserDetails ud) {
        return userRepository.findByUsername(ud.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @GetMapping("/seller/{sellerId}")
    @Operation(summary = "Get all orders for a seller")
    public ResponseEntity<List<Order>> getSellerOrders(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderRepository.findBySeller_UserId(sellerId));
    }

    @GetMapping("/buyer/{buyerId}")
    @Operation(summary = "Get all orders for a buyer")
    public ResponseEntity<List<Order>> getBuyerOrders(@PathVariable Long buyerId) {
        return ResponseEntity.ok(orderRepository.findByRequest_Buyer_UserId(buyerId));
    }

    @PutMapping("/{id}/complete")
    @Operation(summary = "Mark an order as completed (seller action)")
    public ResponseEntity<?> completeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User seller = getUser(userDetails);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + id));

        if (!order.getSeller().getUserId().equals(seller.getUserId()))
            return ResponseEntity.status(403).body(new MessageResponse("Not authorized"));

        order.setStatus(Order.OrderStatus.COMPLETED);
        orderRepository.save(order);
        return ResponseEntity.ok(new MessageResponse("Order marked as completed"));
    }
}

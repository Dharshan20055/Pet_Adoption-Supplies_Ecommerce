package com.petadoption.supplies.controller;

import com.petadoption.supplies.entity.Order;
import com.petadoption.supplies.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping("/requests/{id}/approve")
    public ResponseEntity<Order> approveRequest(@PathVariable Long id) {
        Order order = sellerService.approveRequest(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/requests/{id}/reject")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id) {
        sellerService.rejectRequest(id);
        return ResponseEntity.ok("Request rejected successfully");
    }

  
    @GetMapping("/orders/{sellerId}")
    public ResponseEntity<List<Order>> getSellerOrders(@PathVariable Long sellerId) {
        return ResponseEntity.ok(sellerService.getOrdersBySeller(sellerId));
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody java.util.Map<String, String> body) {
        Order updated = sellerService.updateOrderStatus(orderId, body.get("status"));
        return ResponseEntity.ok(updated);
    }
}
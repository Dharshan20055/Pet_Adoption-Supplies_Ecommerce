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
@RequestMapping("/requests")
@Tag(name = "Requests", description = "Buyer requests and seller approval workflow")
@SecurityRequirement(name = "bearerAuth")
public class RequestController {

    @Autowired private RequestRepository requestRepository;
    @Autowired private PetRepository petRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private OrderRepository orderRepository;

    private User getUser(UserDetails ud) {
        return userRepository.findByUsername(ud.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @PostMapping("/add")
    @Operation(summary = "Submit a request for a pet")
    public ResponseEntity<?> submitRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> body) {
        User buyer = getUser(userDetails);
        Long petId = Long.valueOf(body.get("petId").toString());
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found: " + petId));

        if (!pet.getAvailability())
            return ResponseEntity.badRequest().body(new MessageResponse("Pet is no longer available"));

        Request request = Request.builder()
                .buyer(buyer)
                .pet(pet)
                .description(body.getOrDefault("description", "").toString())
                .status(Request.RequestStatus.PENDING)
                .build();

        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/buyer/{buyerId}")
    @Operation(summary = "Get all requests by buyer ID")
    public ResponseEntity<List<Request>> getBuyerRequests(@PathVariable Long buyerId) {
        return ResponseEntity.ok(requestRepository.findByBuyer_UserId(buyerId));
    }

    @GetMapping("/seller")
    @Operation(summary = "Get all requests for the logged-in seller's pets")
    public ResponseEntity<List<Request>> getSellerRequests(@AuthenticationPrincipal UserDetails userDetails) {
        User seller = getUser(userDetails);
        return ResponseEntity.ok(requestRepository.findByPet_Seller_UserId(seller.getUserId()));
    }

    @PutMapping("/{id}/approve")
    @Operation(summary = "Approve a buyer request (seller action)")
    public ResponseEntity<?> approveRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User seller = getUser(userDetails);
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found: " + id));

        if (!request.getPet().getSeller().getUserId().equals(seller.getUserId()))
            return ResponseEntity.status(403).body(new MessageResponse("Not authorized"));

        if (request.getStatus() != Request.RequestStatus.PENDING)
            return ResponseEntity.badRequest().body(new MessageResponse("Request is not pending"));

        request.setStatus(Request.RequestStatus.ACCEPTED);
        requestRepository.save(request);

        // Mark pet as unavailable
        Pet pet = request.getPet();
        pet.setAvailability(false);
        petRepository.save(pet);

        // Auto-create order
        Order order = Order.builder()
                .request(request)
                .seller(seller)
                .status(Order.OrderStatus.PROCESSING)
                .paymentStatus(Order.PaymentStatus.PENDING)
                .build();
        orderRepository.save(order);

        return ResponseEntity.ok(Map.of("message", "Request approved", "orderId", order.getOrderId()));
    }

    @PutMapping("/{id}/reject")
    @Operation(summary = "Reject a buyer request (seller action)")
    public ResponseEntity<?> rejectRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User seller = getUser(userDetails);
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found: " + id));

        if (!request.getPet().getSeller().getUserId().equals(seller.getUserId()))
            return ResponseEntity.status(403).body(new MessageResponse("Not authorized"));

        request.setStatus(Request.RequestStatus.REJECTED);
        requestRepository.save(request);
        return ResponseEntity.ok(new MessageResponse("Request rejected"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single request by ID")
    public ResponseEntity<Request> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found: " + id)));
    }
}

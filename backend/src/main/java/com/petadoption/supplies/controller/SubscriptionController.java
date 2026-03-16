package com.petadoption.supplies.controller;

import com.petadoption.supplies.dto.response.CheckoutResponse;
import com.petadoption.supplies.dto.response.SubscriptionStatusResponse;
import com.petadoption.supplies.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/create-checkout")
    public ResponseEntity<CheckoutResponse> createCheckout(Authentication authentication) {
        return ResponseEntity.ok(subscriptionService.createCheckoutSession(authentication.getName()));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(@RequestBody String payload,
                                              @RequestHeader("Stripe-Signature") String sigHeader) {
        subscriptionService.handleWebhook(payload, sigHeader);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status")
    public ResponseEntity<SubscriptionStatusResponse> getStatus(Authentication authentication) {
        return ResponseEntity.ok(subscriptionService.getStatus(authentication.getName()));
    }

    @GetMapping("/verify-session")
    public ResponseEntity<SubscriptionStatusResponse> verifySession(@RequestParam("session_id") String sessionId) {
        return ResponseEntity.ok(subscriptionService.verifySession(sessionId));
    }
}

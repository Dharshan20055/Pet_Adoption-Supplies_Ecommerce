package com.petadoption.supplies.service;

import com.petadoption.supplies.dto.response.CheckoutResponse;
import com.petadoption.supplies.dto.response.SubscriptionStatusResponse;

public interface SubscriptionService {
    CheckoutResponse createCheckoutSession(String username);
    void handleWebhook(String payload, String sigHeader);
    SubscriptionStatusResponse getStatus(String username);
    SubscriptionStatusResponse verifySession(String sessionId);
}

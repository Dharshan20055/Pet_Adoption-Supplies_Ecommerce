package com.petadoption.supplies.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionStatusResponse {
    private boolean subscribed;
    private String plan;
    private LocalDateTime subscribedAt;
    private LocalDateTime subscriptionExpiresAt;
    private String message;
}

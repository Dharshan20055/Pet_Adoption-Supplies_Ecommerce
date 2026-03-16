package com.petmarketplace.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

// ---- Buyer Request DTO ----
@Data
class RequestSubmitRequest {
    @NotNull
    private Long petId;
    private String description;
}

// ---- License DTO ----
@Data
class LicenseRequest {
    @NotBlank
    private String licenseNumber;
    private LocalDate issuedDate;
    private LocalDate expiryDate;
}

// ---- Profile Update DTO ----
@Data
class ProfileUpdateRequest {
    private String email;
    private String contact;
    private String location;
    private String currentPassword;
    private String newPassword;
}

// ---- Chat Message DTO ----
@Data
class ChatMessageRequest {
    @NotNull
    private Long requestId;
    @NotNull
    private Long receiverId;
    @NotBlank
    private String message;
}

// ---- Payment (Stripe) DTO ----
@Data
class PaymentRequest {
    @NotNull
    private Long orderId;
    private String successUrl;
    private String cancelUrl;
}

package com.petadoption.supplies.serviceImpl;

import com.petadoption.supplies.dto.response.CheckoutResponse;
import com.petadoption.supplies.dto.response.SubscriptionStatusResponse;
import com.petadoption.supplies.entity.User;
import com.petadoption.supplies.exception.UserException;
import com.petadoption.supplies.repository.UserRepository;
import com.petadoption.supplies.service.SubscriptionService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionServiceImpl implements SubscriptionService {

    private static final String PLAN_PREMIUM = "PREMIUM";
    private static final String PLAN_FREE = "FREE";
    private static final String STATUS_COMPLETE = "complete";
    private static final String PAYMENT_STATUS_PAID = "paid";

    @Value("${stripe.secret.key}")
    private String secretKey;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    private final UserRepository userRepository;

    @Override
    public CheckoutResponse createCheckoutSession(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserException("User not found"));

        try {
            if (user.getStripeCustomerId() == null) {
                CustomerCreateParams params = CustomerCreateParams.builder()
                        .setEmail(user.getEmail())
                        .setName(user.getUsername())
                        .build();
                Customer customer = Customer.create(params);
                user.setStripeCustomerId(customer.getId());
                userRepository.save(user);
            }

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setCustomer(user.getStripeCustomerId())
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("inr")
                                    .setUnitAmount(5100L) // ₹51 = 5100 paise (Stripe minimum is ~$0.50)
                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("PetAdopt Premium")
                                            .build())
                                    .build())
                            .build())
                    .setSuccessUrl(frontendUrl + "/subscribe/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/subscribe/cancel")
                    .build();

            Session session = Session.create(params);
            return new CheckoutResponse(session.getId(), session.getUrl());

        } catch (StripeException e) {
            throw new RuntimeException("Stripe session creation failed: " + e.getMessage());
        }
    }

    @Override
    public void handleWebhook(String payload, String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

            switch (event.getType()) {
                case "checkout.session.completed":
                    Session session = (Session) event.getDataObjectDeserializer().getObject().get();
                    updateUserSubscription(session.getCustomer(), null);
                    break;
                default:
                    log.info("Unhandled event type: {}", event.getType());
            }

        } catch (SignatureVerificationException e) {
            throw new RuntimeException("Invalid webhook signature");
        }
    }

    private void updateUserSubscription(String stripeCustomerId, String stripeSubscriptionId) {
        User user = userRepository.findByStripeCustomerId(stripeCustomerId)
                .orElseThrow(() -> new UserException("User not found with Stripe ID: " + stripeCustomerId));
        user.setSubscribed(true);
        user.setSubscribedAt(LocalDateTime.now());
        // For one-time payments, we set expiry to 1 month from now
        user.setSubscriptionExpiresAt(LocalDateTime.now().plusMonths(1));
        user.setStripeSubscriptionId(stripeSubscriptionId);
        userRepository.save(user);
    }

    @Override
    public SubscriptionStatusResponse getStatus(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserException("User not found"));

        if (user.isSubscribed() && user.getSubscriptionExpiresAt() != null &&
                user.getSubscriptionExpiresAt().isBefore(LocalDateTime.now())) {
            user.setSubscribed(false);
            userRepository.save(user);
        }

        String message = user.isSubscribed() ? "You are a Premium Member" : "Upgrade to Premium for full access";

        return new SubscriptionStatusResponse(
                user.isSubscribed(),
                user.isSubscribed() ? PLAN_PREMIUM : PLAN_FREE,
                user.getSubscribedAt(),
                user.getSubscriptionExpiresAt(),
                message
        );
    }

    @Override
    public SubscriptionStatusResponse verifySession(String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);
            String stripeCustomerId = session.getCustomer();

            if (STATUS_COMPLETE.equals(session.getStatus()) || PAYMENT_STATUS_PAID.equals(session.getPaymentStatus())) {
                updateUserSubscription(stripeCustomerId, null);
            }

            User user = userRepository.findByStripeCustomerId(stripeCustomerId)
                    .orElseThrow(() -> new UserException("User not found"));

            return new SubscriptionStatusResponse(
                    user.isSubscribed(),
                    PLAN_PREMIUM,
                    user.getSubscribedAt(),
                    user.getSubscriptionExpiresAt(),
                    "Payment verified successfully"
            );
        } catch (StripeException e) {
            throw new RuntimeException("Stripe session retrieval failed: " + e.getMessage());
        }
    }
}

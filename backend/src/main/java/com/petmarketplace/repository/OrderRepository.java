package com.petmarketplace.repository;

import com.petmarketplace.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findBySeller_UserId(Long sellerId);
    List<Order> findByRequest_Buyer_UserId(Long buyerId);
    Optional<Order> findByStripePaymentIntentId(String paymentIntentId);
}

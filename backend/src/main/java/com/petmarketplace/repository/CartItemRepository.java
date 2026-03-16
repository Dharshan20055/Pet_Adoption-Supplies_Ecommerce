package com.petmarketplace.repository;

import com.petmarketplace.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByBuyer_UserId(Long buyerId);
    Optional<CartItem> findByBuyer_UserIdAndPet_PetId(Long buyerId, Long petId);
    void deleteByBuyer_UserId(Long buyerId);
}

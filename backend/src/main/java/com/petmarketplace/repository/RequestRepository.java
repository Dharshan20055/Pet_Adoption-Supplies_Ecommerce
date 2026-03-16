package com.petmarketplace.repository;

import com.petmarketplace.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByBuyer_UserId(Long buyerId);
    List<Request> findByPet_Seller_UserId(Long sellerId);
    List<Request> findByBuyer_UserIdAndStatus(Long buyerId, Request.RequestStatus status);
}

package com.petadoption.supplies.repository;

import com.petadoption.supplies.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, String> {

    List<Request> findByBuyerId(UUID buyerId);

}
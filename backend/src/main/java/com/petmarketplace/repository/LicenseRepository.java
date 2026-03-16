package com.petmarketplace.repository;

import com.petmarketplace.entity.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LicenseRepository extends JpaRepository<License, Long> {
    List<License> findBySeller_UserId(Long sellerId);
    Optional<License> findByLicenseNumber(String licenseNumber);
}

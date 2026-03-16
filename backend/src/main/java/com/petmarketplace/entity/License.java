package com.petmarketplace.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "licenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long licenseId;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    private LocalDate issuedDate;

    private LocalDate expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    public boolean isValid() {
        return expiryDate != null && expiryDate.isAfter(LocalDate.now());
    }
}

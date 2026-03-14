package com.petadoption.supplies.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "licenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID license_id;

    private String license_number; 
    
    private LocalDate issued_date;
    
    private LocalDate expiry_date; 

    private Long seller_id; 
}
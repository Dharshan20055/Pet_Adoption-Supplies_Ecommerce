package com.petadoption.supplies.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "pets")
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID pet_id;

    private UUID seller_id;
    private String name;
    private String breed;
    private Integer age;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String type; 
    private Double price;
    private UUID license_id; 
    private Boolean availability = true;
    private String location;
    private String imageUrl;
    private Boolean is_adopted = false;

    public String getType() {
        return this.type;
    }

    public String getName() {
        return this.name;
    }

    public String getBreed() {
        return this.breed;
    }

    public String getLocation() {
        return this.location;
    }

    public UUID getLicense_id() {
        return this.license_id;
    }

    public Double getPrice() {
        return this.price;
    }
}
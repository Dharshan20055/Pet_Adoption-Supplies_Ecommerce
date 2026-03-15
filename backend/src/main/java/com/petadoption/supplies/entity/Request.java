package com.petadoption.supplies.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="requests")
@Data
public class Request {

    @Id
    private String requestId;

    private String buyerId;

    private String petId;

    private String description;

    private String status;

    private String type;
}
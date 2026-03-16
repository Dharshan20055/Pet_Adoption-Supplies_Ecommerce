package com.petmarketplace;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Pet Marketplace API",
                version = "1.0.0",
                description = "REST API for Pet Adoption & Sales Ecommerce Platform",
                contact = @Contact(name = "Pet Marketplace Team"),
                license = @License(name = "MIT")
        )
)
public class PetMarketplaceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PetMarketplaceApplication.class, args);
    }
}

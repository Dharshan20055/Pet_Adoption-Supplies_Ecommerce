package com.petmarketplace.dto.response;

import com.petmarketplace.entity.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

// ---- JWT Response ----
@Data @AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;

    public JwtResponse(String token, Long id, String username, String email) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

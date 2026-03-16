package com.petadoption.supplies.dto.response;

import lombok.Data;

@Data
public class UserProfileResponse {
    private String username;
    private String email;
    private String location;
    private String contact;
}

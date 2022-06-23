package com.back.back.models.requestsAndResponses;

import com.back.back.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class RegisterRequest {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Role role;
}

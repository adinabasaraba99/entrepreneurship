package com.back.back.models.requestsAndResponses;

import com.back.back.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthenticationResponse {
    private final String jwt;
    private final String email;
    private final Role role;
}

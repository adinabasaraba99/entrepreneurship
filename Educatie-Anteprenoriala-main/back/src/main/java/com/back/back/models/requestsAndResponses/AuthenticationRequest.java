package com.back.back.models.requestsAndResponses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}

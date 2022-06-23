package com.back.back.models.requestsAndResponses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class RequestDeleteUser {
    String email;
}

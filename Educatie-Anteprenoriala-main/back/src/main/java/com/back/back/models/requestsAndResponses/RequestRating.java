package com.back.back.models.requestsAndResponses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class RequestRating {
    private String emailUser;
    private String email;
    private String title;
    private float rating;
}

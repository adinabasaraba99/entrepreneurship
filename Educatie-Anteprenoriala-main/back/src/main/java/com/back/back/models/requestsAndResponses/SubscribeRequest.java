package com.back.back.models.requestsAndResponses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class SubscribeRequest {
    private String subscriber;
    private String moderator;
}

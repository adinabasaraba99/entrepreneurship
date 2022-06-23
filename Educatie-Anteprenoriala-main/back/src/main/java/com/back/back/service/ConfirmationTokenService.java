package com.back.back.service;

import com.back.back.models.ConfirmationToken;
import com.back.back.repository.ConfirmationTokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepo confirmationTokenRepo;

    public void saveCorfirmationToken(ConfirmationToken token) {
        confirmationTokenRepo.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepo.findByToken(token);
    }

    public void updateConfirmedAt(String token) {
        confirmationTokenRepo.updateConfirmedAt(token, LocalDateTime.now());
    }
}

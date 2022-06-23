package com.back.back.repository;

import com.back.back.models.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ConfirmationTokenRepo extends JpaRepository<ConfirmationToken, Long> {

    Optional<ConfirmationToken> findByToken(String token);

    @Modifying
    @Query("update ConfirmationToken c set c.confirmedAt = ?2 where c.token = ?1")
    void updateConfirmedAt(String token, LocalDateTime confirmedAt);

}

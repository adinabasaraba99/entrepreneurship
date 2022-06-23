package com.back.back.repository;

import com.back.back.models.AppUser;
import com.back.back.models.Subscriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface SubscriptionsRepo extends JpaRepository<Subscriptions, Long> {
    Optional<Subscriptions> findByMeAndModerator(AppUser me, AppUser moderator);

    ArrayList<Subscriptions> findAllByMe(AppUser me);

    @Transactional
    @Modifying
    @Query("delete from Subscriptions s where s.me = ?1 and s.moderator = ?2")
    void deleteByMeAndModerator(AppUser me, AppUser moderator);

    @Transactional
    @Modifying
    @Query("delete from Subscriptions s where s.me = ?1 or s.moderator = ?1")
    void deleteAllByMeOrModerator(AppUser appUser);
}

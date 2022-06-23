package com.back.back.repository;

import com.back.back.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    @Modifying
    @Query("update AppUser a set a.confirmed = true where a.email = ?1")
    void  updateConfirmAppUser(String email);

    @Query("select a.email from AppUser a where a.role = 'MODERATOR' or a.role = 'USER'")
    ArrayList<String> findAllUsers();

    @Transactional
    void deleteAppUserByEmail(String email);
}

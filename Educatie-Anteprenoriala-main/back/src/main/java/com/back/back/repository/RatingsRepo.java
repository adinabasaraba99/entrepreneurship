package com.back.back.repository;

import com.back.back.models.AppUser;
import com.back.back.models.Course;
import com.back.back.models.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface RatingsRepo extends JpaRepository<Ratings, Long> {

    Optional<Ratings> findByUserAndCourse(AppUser appUser, Course course);

    @Transactional
    @Modifying
    @Query("update Ratings c set c.rating = ?2 where c.user=?1 and c.course=?3")
    void updateRating(AppUser appUser, float rating, Course course);
}

package com.back.back.repository;

import com.back.back.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

    Optional<Course> findByBackName(String back_name);

    @Transactional
    @Modifying
    @Query("delete from Course c where c.backName = ?1")
    void deleteCourseByBackName(String backName);

    @Transactional
    @Modifying
    @Query("update Course c set c.numberOfRatings = ?2 , c.rating = ?1 where c.backName = ?3")
    void updateRating(float rating, int number, String backName);

    @Transactional
    @Modifying
    void deleteCoursesByEmail(String email);

}

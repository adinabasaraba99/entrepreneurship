package com.back.back.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Course {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private long id;
    private String email;
    private String title;

    @Column(unique = true, length = 250)
    private String backName;

    private String description;
    private String type;
    private LocalDateTime addedTime;
    private float rating;
    private int numberOfRatings;

    @OneToMany(mappedBy = "course")
    private List<Ratings> users = new ArrayList<>();

    public Course(String email,
                  String title,
                  String backName,
                  String description,
                  String type,
                  LocalDateTime addedTime) {
        this.email = email;
        this.title = title;
        this.backName = backName;
        this.description = description;
        this.type = type;
        this.addedTime = addedTime;
        this.rating = 0;
        this.numberOfRatings = 0;
    }
}

package com.back.back.models.requestsAndResponses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.nio.file.Path;
import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
@Getter
public class LoadCourseResponse implements Comparable<LoadCourseResponse>{
    private Object file;
    private Path path;
    private String email;
    private String title;
    private String description;
    private String type;
    private LocalDateTime data;
    private float rating;

    public LoadCourseResponse(Path path,
                              String email,
                              String title,
                              String description,
                              String type,
                              LocalDateTime data,
                              float rating) {
        this.path = path;
        this.email = email;
        this.title = title;
        this.description = description;
        this.type = type;
        this.data = data;
        this.rating = rating;
    }

    @Override
    public int compareTo(LoadCourseResponse o) {
        return o.data.compareTo(this.data);
    }
}

package com.back.back.service;

import com.back.back.models.requestsAndResponses.*;
import org.springframework.core.io.Resource;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Map;

public interface StorageService {

    void init();

    String store(AddCourseRequest addCourseRequest);

    ArrayList<ArrayList<LoadCourseResponse>> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();

    String deleteCourse(RequestDelete requestDelete);

    Map<String, ArrayList<LoadCourseResponse>> loadAllFavorites(String email);

    ArrayList<LoadCourseResponse> loadMyCourses(String email);

    ArrayList<LoadCourseResponse> searchCourses(String query);

    String rateCourse(RequestRating requestRating);

    String deleteCourses(RequestDeleteUser requestDeleteUser);
}

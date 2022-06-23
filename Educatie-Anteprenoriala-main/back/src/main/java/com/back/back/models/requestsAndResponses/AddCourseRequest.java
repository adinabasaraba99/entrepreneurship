package com.back.back.models.requestsAndResponses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class AddCourseRequest {
    private MultipartFile file;
    private String email;
    private String title;
    private String description;
    private String type;
}

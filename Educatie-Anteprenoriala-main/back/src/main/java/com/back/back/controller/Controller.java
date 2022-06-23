package com.back.back.controller;

import com.back.back.models.AppUser;
import com.back.back.models.requestsAndResponses.*;
import com.back.back.service.AppUserService;
import com.back.back.service.LoginService;
import com.back.back.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(path = "/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    private final AppUserService appUserService;
    private final LoginService loginService;
    private final StorageService storageService;

    @PostMapping(path = "/register")
    public String registerNewUser(@RequestBody RegisterRequest registerRequest) {
        return appUserService.registerNewUser(registerRequest);
    }

    @GetMapping(path = "/confirmToken")
    public void confirmToken(String token) {
        appUserService.confirmToken(token);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        return loginService.tryLogin(authenticationRequest);
    }

    @PostMapping(path = "/subscribe")
    public String subscribe(@RequestBody SubscribeRequest subscribeRequest) {
        return appUserService.subscribe(subscribeRequest);
    }

    @PostMapping(path = "/unsubscribe")
    public String unsubscribe(@RequestBody SubscribeRequest subscribeRequest) {
        return appUserService.unsubscribe(subscribeRequest);
    }

    @GetMapping(path = "/getAllSubscribers")
    @ResponseBody
    public ArrayList<String> getAllSubscribers (@RequestParam("email") String email) {
        return appUserService.getSubscribers(email);
    }


    @PostMapping(path = "/uploadCourse")
    public String uploadFile(@ModelAttribute AddCourseRequest addCourseRequest) {
        return storageService.store(addCourseRequest);
    }

    @GetMapping(path = "/downloadCourse/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "video/mp4")
                                    .header(HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping(path = "/loadCourses")
    public ArrayList<ArrayList<LoadCourseResponse>> listUploadedFiles() {

        ArrayList<ArrayList<LoadCourseResponse>> responses = storageService.loadAll();

        for (ArrayList<LoadCourseResponse> respons : responses) {
            for (LoadCourseResponse response : respons) {
                response.setFile(MvcUriComponentsBuilder.fromMethodName(Controller.class,
                        "serveFile", response.getPath().getFileName().toString()).build().toUri().toString());
                response.setPath(null);
            }
        }

        return responses;
    }

    @GetMapping(path = "/loadAllFavorites")
    @ResponseBody
    public Map<String, ArrayList<LoadCourseResponse>> listFavorites(@RequestParam("email") String email) {
        Map<String, ArrayList<LoadCourseResponse>> responses = storageService.loadAllFavorites(email);

        for (Map.Entry<String, ArrayList<LoadCourseResponse>> respons : responses.entrySet()) {
            for (LoadCourseResponse response : respons.getValue()) {
                response.setFile(MvcUriComponentsBuilder.fromMethodName(Controller.class,
                        "serveFile", response.getPath().getFileName().toString()).build().toUri().toString());
                response.setPath(null);
            }
        }

        return responses;
    }

    @GetMapping(path = "/loadMyCourses")
    @ResponseBody
    public ArrayList<LoadCourseResponse> listMyCourses(@RequestParam("email") String email) {
        ArrayList<LoadCourseResponse> responses = storageService.loadMyCourses(email);

        for(LoadCourseResponse response : responses) {
            response.setFile(MvcUriComponentsBuilder.fromMethodName(Controller.class,
                    "serveFile", response.getPath().getFileName().toString()).build().toUri().toString());
            response.setPath(null);
        }

        return responses;
    }

    @PostMapping(path = "/deleteCourse")
    public String deleteCourse(@RequestBody RequestDelete requestDelete) {
        return storageService.deleteCourse(requestDelete);
    }

    @PostMapping(path = "/searchCourses")
    public ResponseEntity<ArrayList<LoadCourseResponse>> searchCourses(@RequestBody String query){
        ArrayList<LoadCourseResponse> responses = storageService.searchCourses(query);

        for(LoadCourseResponse response : responses) {
            response.setFile(MvcUriComponentsBuilder.fromMethodName(Controller.class,
                    "serveFile", response.getPath().getFileName().toString()).build().toUri().toString());
            response.setPath(null);
        }
        return ResponseEntity.ok().body(responses);
    }

    @PostMapping(path= "/rateCourse")
    public String rateCourse(@RequestBody RequestRating requestRating) {
        if(requestRating.getRating() < 1 || requestRating.getRating() > 10)
            return "Invalid rating value";
        return storageService.rateCourse(requestRating);
    }

   @GetMapping(path = "/loadAllUsers")
    public ArrayList<String> loadAllUsers() {
        return appUserService.getAllUsers();
   }

   @PostMapping(path = "/deleteUser")
    public String deleteUser(@RequestBody RequestDeleteUser email) {
       String delSubscriptions = appUserService.deleteUserFromSubscribe(email);
       String delCourses = storageService.deleteCourses(email);
       String delUser = appUserService.deleteUser(email);

       if ("success".equals(delSubscriptions) &&
               "success".equals(delCourses) &&
               "success".equals(delUser)) {
       return "success";
       }

       return "Error detected!";
   }
}

package com.back.back.service;

import com.back.back.models.AppUser;
import com.back.back.models.Course;
import com.back.back.models.Ratings;
import com.back.back.models.Subscriptions;
import com.back.back.models.requestsAndResponses.*;
import com.back.back.repository.AppUserRepo;
import com.back.back.repository.CourseRepo;
import com.back.back.repository.RatingsRepo;
import com.back.back.repository.SubscriptionsRepo;
import com.back.back.util.StorageException;
import com.back.back.util.StorageFileNotFoundException;
import com.back.back.util.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Stream;

@Service
public class CourseService implements StorageService {

    private final CourseRepo courseRepo;
    private final Path rootLocation;
    private final SubscriptionsRepo subscriptionsRepo;
    private final AppUserRepo appUserRepo;
    private final RatingsRepo ratingsRepo;

    @Autowired
    public CourseService(CourseRepo courseRepo,
                         StorageProperties properties,
                         SubscriptionsRepo subscriptionsRepo,
                         AppUserRepo appUserRepo,
                         RatingsRepo ratingsRepo) {
        this.courseRepo = courseRepo;
        this.rootLocation = Paths.get(properties.getLocation());
        this.subscriptionsRepo = subscriptionsRepo;
        this.appUserRepo = appUserRepo;
        this.ratingsRepo = ratingsRepo;
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    @Override
    public String store(AddCourseRequest addCourseRequest) {
        try {
            MultipartFile file = addCourseRequest.getFile();
            String email = addCourseRequest.getEmail();
            String description = addCourseRequest.getDescription();
            String title = addCourseRequest.getTitle();
            String type = addCourseRequest.getType();
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            String file_name = file.getOriginalFilename();
            assert file_name != null;
            String[] extension = file_name.split("\\.");
            if (!Objects.equals(extension[extension.length - 1], "mp4")) {
                return "wrong file format";
            }

            String name = email + "_" + title;
            if (courseRepo.findByBackName(name).isPresent()) {
                return "You have already posted a video named that way";
            }

            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(name))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }
            if (Objects.equals(title, "") || Objects.equals(description, "") || Objects.equals(type, "")) {
                return "Cannot store empty input.";
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
                courseRepo.save(new Course(email, title, name, description, type,  LocalDateTime.now()));
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
        return "SUCCESS";
    }

    @Override
    public ArrayList<ArrayList<LoadCourseResponse>> loadAll() {
        try {
            ArrayList<ArrayList<LoadCourseResponse>> responses = new ArrayList<>();

            Stream<Path> s =  Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);

            ArrayList<LoadCourseResponse> crypto = new ArrayList<>();
            ArrayList<LoadCourseResponse> marketing = new ArrayList<>();
            ArrayList<LoadCourseResponse> inovatii = new ArrayList<>();
            ArrayList<LoadCourseResponse> investitii = new ArrayList<>();

            s.forEach(path -> {
                String backName = path.getFileName().toString();
                Course course = courseRepo.findByBackName(backName).get();

                if(Objects.equals(course.getType(), "crypto")) {
                    crypto.add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                } else if (Objects.equals(course.getType(), "marketing")) {
                    marketing.add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                } else if (Objects.equals(course.getType(), "inovatii")) {
                    inovatii.add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                } else {
                    investitii.add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                }
            });

            Collections.sort(crypto);
            Collections.sort(marketing);
            Collections.sort(inovatii);
            Collections.sort(investitii);

            if(crypto.size() > 10) {
                crypto.subList(10, crypto.size()).clear();
            }
            if(marketing.size() > 10) {
                marketing.subList(10, marketing.size()).clear();
            }
            if(inovatii.size() > 10) {
                inovatii.subList(10, inovatii.size()).clear();
            }
            if(investitii.size() > 10) {
                investitii.subList(10, investitii.size()).clear();
            }

            responses.add(crypto);
            responses.add(marketing);
            responses.add(inovatii);
            responses.add(investitii);

            return responses;
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    @Transactional
    public String deleteCourse(RequestDelete requestDelete) {
        String backName = requestDelete.getEmail() + "_" + requestDelete.getTitle();

        Optional<Course> course = courseRepo.findByBackName(backName);

        if(course.isEmpty())
            return "nu exista";
        else {
            File fileToDelete = new File(rootLocation + "/" + backName);
            boolean success = fileToDelete.delete();
            courseRepo.deleteCourseByBackName(backName);
            if(success) return "success";
            return "fail";
        }
    }

    @Override
    public Map<String, ArrayList<LoadCourseResponse>> loadAllFavorites(String email) {
        try {
            Map<String, ArrayList<LoadCourseResponse>> response = new HashMap<>();

            Stream<Path> s =  Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);

            s.forEach(path -> {
                String backName = path.getFileName().toString();
                Course course = courseRepo.findByBackName(backName).get();

                if (IsSubscribed(email, course.getEmail())) {
                    if(!response.containsKey(course.getEmail()))
                        response.put(course.getEmail(), new ArrayList<>());

                    response.get(course.getEmail()).add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                }
            });

            return response;

        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    public boolean IsSubscribed(String email, String moderator) {
        AppUser email_user = appUserRepo.findByEmail(email).get();
        AppUser moderator_user = appUserRepo.findByEmail(moderator).get();

        Optional<Subscriptions> subs = subscriptionsRepo.findByMeAndModerator(email_user, moderator_user);

        return subs.isPresent();
    }

    @Override
    public ArrayList<LoadCourseResponse> loadMyCourses(String email) {
        try {
            ArrayList<LoadCourseResponse> result = new ArrayList<>();

            Stream<Path> s = Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);

            s.forEach(path -> {
                String backName = path.getFileName().toString();
                Course course = courseRepo.findByBackName(backName).get();

                if(Objects.equals(course.getEmail(), email)) {
                    result.add(new LoadCourseResponse(path,
                            course.getEmail(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getType(),
                            course.getAddedTime(),
                            course.getRating()));
                }
            });

            return result;

        } catch (IOException e) {
        throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    public ArrayList<LoadCourseResponse> searchCourses(String query) {
        ArrayList<LoadCourseResponse> responses = new ArrayList<>();
        String[] queryArray = query.split("\\s+");
        for (int i = 0; i < queryArray.length; i++) {
            queryArray[i] = queryArray[i].replaceAll("[^\\w]", "");
        }

        try {
            Stream<Path> s =  Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);

            s.forEach(path -> {
                String backName = path.getFileName().toString();
                Optional<Course> c = courseRepo.findByBackName(backName);

                if(c.isPresent()) {
                    Course course = c.get();

                    for (String word : queryArray) {
                        if(word.equals("")) continue;
                        if (course.getTitle().toLowerCase().contains(word.toLowerCase())) {
                            responses.add(new LoadCourseResponse(path,
                                    course.getEmail(),
                                    course.getTitle(),
                                    course.getDescription(),
                                    course.getType(),
                                    course.getAddedTime(),
                                    course.getRating()));
                            break;
                        }
                        if (course.getDescription().toLowerCase().contains(word.toLowerCase())) {
                            responses.add(new LoadCourseResponse(path,
                                    course.getEmail(),
                                    course.getTitle(),
                                    course.getDescription(),
                                    course.getType(),
                                    course.getAddedTime(),
                                    course.getRating()));
                            break;
                        }
                    }
                }

            });

            return responses;
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    @Override
    @Transactional
    public String rateCourse(RequestRating requestRating) {
        String backName = requestRating.getEmail() + "_" + requestRating.getTitle();
        Optional<Course> course = courseRepo.findByBackName(backName);
        Optional<AppUser> appUser = appUserRepo.findByEmail(requestRating.getEmailUser());

        if (course.isPresent() && appUser.isPresent()) {
            if(course.get().getRating() == 0) {
                ratingsRepo.save(new Ratings(appUser.get(),
                                requestRating.getRating(),
                                course.get()));
                courseRepo.updateRating(requestRating.getRating(),  1, backName);
                return "The rating has been updated";
            }
            Optional<Ratings> ratings = ratingsRepo.findByUserAndCourse(appUser.get(), course.get());

            float newRating = course.get().getRating() * course.get().getNumberOfRatings();
            if(ratings.isEmpty()) {
                newRating += requestRating.getRating();
                newRating /= (course.get().getNumberOfRatings() + 1);
                ratingsRepo.save(new Ratings(appUser.get(),
                                requestRating.getRating(),
                                course.get()));
                courseRepo.updateRating(newRating, course.get().getNumberOfRatings() + 1, backName);
            } else {
                newRating -= ratings.get().getRating();
                newRating += requestRating.getRating();
                newRating /= course.get().getNumberOfRatings();
                ratingsRepo.updateRating(appUser.get(), requestRating.getRating(), course.get());
                courseRepo.updateRating(newRating, course.get().getNumberOfRatings(), backName);
            }
            return "The rating has been updated";
        } else {
            return "The course was not found";
        }
    }

    @Override
    public String deleteCourses(RequestDeleteUser requestDeleteUser) {
        String backName = requestDeleteUser.getEmail();

        final File folder = new File(rootLocation + "/");

        final File[] files = folder.listFiles( new FilenameFilter() {
            @Override
            public boolean accept( final File dir,
                                   final String name ) {
                if (backName.length() <= name.length()) {
                    return backName.equals(name.substring(0, backName.length()));
                }

                return false;
            }
        });
        for ( final File file : files ) {
            if ( !file.delete() ) {
                System.err.println( "Can't remove " + file.getAbsolutePath() );
            }
        }

        return "success";
    }
}

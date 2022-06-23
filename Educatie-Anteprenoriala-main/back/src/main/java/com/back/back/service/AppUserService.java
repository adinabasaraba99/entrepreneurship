package com.back.back.service;

import com.back.back.models.*;
import com.back.back.models.requestsAndResponses.RegisterRequest;
import com.back.back.models.requestsAndResponses.RequestDeleteUser;
import com.back.back.models.requestsAndResponses.SubscribeRequest;
import com.back.back.repository.AppUserRepo;
import com.back.back.repository.SubscriptionsRepo;
import com.back.back.security.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppUserService implements UserDetailsService {

    private final AppUserRepo appUserRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;
    private final SubscriptionsRepo subscriptionsRepo;

    public String registerNewUser(RegisterRequest registerRequest) {
        if(registerRequest.getName().length() == 0 || registerRequest.getSurname().length() == 0) {
            return "You must fill your name and surname!";
        }

        //verificam daca email-ul are fromatul corespunzator
        if(!emailValidator.validateEmail(registerRequest.getEmail())) {
            return "The email does not have the right format!";
        }

        //verificam daca un user cu email-ul respectiv se gaseste deja
        Optional<AppUser> user = appUserRepo.findByEmail(registerRequest.getEmail());
        if(user.isPresent()) {
            return "Email already taken!";
        }

        if(registerRequest.getPassword().length() < 6) {
            return "The password must be at least 6 characters!";
        }

        //incriptam parola si salvam userul in baza de date
        AppUser appUser = new AppUser(registerRequest.getName(),
                registerRequest.getSurname(),
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getRole(),
                new ArrayList<>());
        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        appUserRepo.save(appUser);

        //salvam tokenul in baza de date
        String token = UUID.randomUUID().toString();
        confirmationTokenService.saveCorfirmationToken(new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(20),
                appUser
        ));

        //trimitem tokenul pe mail pentru verificare
        String link = "http://localhost:8080/api/confirmToken?token=" + token;

        emailService.send(appUser.getEmail(), buildEmail(link));

        return "You have been registered, now confirm your email!";
    }

    @Transactional
    public void confirmToken(String token) {
        //verificam daca token-ul exista
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("token not found"));

        //verificam daca tokenul a fost deja verificat
        if(confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("token already confirmed");
        }

        //verificam daca tokenul a expirat deja
        if(confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.updateConfirmedAt(token);
        appUserRepo.updateConfirmAppUser(confirmationToken.getAppUser().getEmail());
    }

    public String buildEmail(String link) {
        return "Hello,\n" +
                "\n" +
                "\n" +
                "Thanks for your registration!\n" +
                "\n" +
                "Please confirm your registration by clicking on the link below.\n" +
                "\n" +
                "\n" +
                link +
                "\n" +
                "\n" +
                "\n" +
                "Educatie Antreprenoriala";
    }

    //am implementa UserDetailsService
    //metoda de mai jos folosita pentru login
    //la noi email = username
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepo.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(
                        String.format("username with email %s not found", email)
                ));
    }

    public String subscribe(SubscribeRequest subscribeRequest) {
        AppUser subscriber = appUserRepo.findByEmail(subscribeRequest.getSubscriber()).get();
        AppUser moderator = appUserRepo.findByEmail(subscribeRequest.getModerator()).get();

        if(moderator.getRole() == Role.MODERATOR) {
            if(subscriptionsRepo.findByMeAndModerator(subscriber, moderator).isPresent()) {
                return "You are already subscribed";
            } else {
                subscriptionsRepo.save(new Subscriptions(subscriber, moderator));
                subscriber.getSubscriptions().add(new Subscriptions(subscriber, moderator));
                return "You have subscribed to " + subscribeRequest.getModerator();
            }
        } else {
            return "You cannot subscribe to a normal user";
        }
    }

    public String unsubscribe(SubscribeRequest subscribeRequest) {
        AppUser subscriber = appUserRepo.findByEmail(subscribeRequest.getSubscriber()).get();
        AppUser moderator = appUserRepo.findByEmail(subscribeRequest.getModerator()).get();

        if(moderator.getRole() == Role.MODERATOR) {
            if(subscriptionsRepo.findByMeAndModerator(subscriber, moderator).isEmpty()) {
                return "You are not subscribed";
            } else {
                subscriptionsRepo.deleteByMeAndModerator(subscriber, moderator);
                return "You have unsubscribed from " + subscribeRequest.getModerator();
            }
        } else {
            return "You cannot subscribe to a normal user";
        }
    }

    public ArrayList<String> getSubscribers (String email) {
        ArrayList<String> result = new ArrayList<>();
        Optional<AppUser> appUser = appUserRepo.findByEmail(email);

        if(appUser.isEmpty()) throw new RuntimeException("the email does not exists");
        else {
            ArrayList<Subscriptions> subscriptions = subscriptionsRepo.findAllByMe(appUser.get());
            for (Subscriptions subscription : subscriptions) {
                result.add(subscription.getModerator().getEmail());
            }
        }

        return result;
    }

    public ArrayList<String> getAllUsers () {
        return appUserRepo.findAllUsers();
    }

    public String deleteUser(RequestDeleteUser requestDeleteUser) {
        Optional<AppUser> appUser = appUserRepo.findByEmail(requestDeleteUser.getEmail());
        if (!appUser.isPresent()) {
            return "User not exist!";
        }

        appUserRepo.deleteAppUserByEmail(requestDeleteUser.getEmail());
        return "success";
    }

    public String deleteUserFromSubscribe(RequestDeleteUser requestDeleteUser) {
        AppUser appUser = appUserRepo.findByEmail(requestDeleteUser.getEmail()).get();
        subscriptionsRepo.deleteAllByMeOrModerator(appUser);

        return "success";
    }
}

package com.back.back.service;

import com.back.back.models.AppUser;
import com.back.back.models.requestsAndResponses.AuthenticationRequest;
import com.back.back.models.requestsAndResponses.AuthenticationResponse;
import com.back.back.repository.AppUserRepo;
import com.back.back.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AppUserService appUserService;
    private final AppUserRepo appUserRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    public ResponseEntity<?> tryLogin(AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.OK);
        }

        final UserDetails userDetails = appUserService.
                loadUserByUsername(authenticationRequest.getUsername());

        final AppUser appUser = appUserRepo.findByEmail(authenticationRequest.getUsername()).get();

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, authenticationRequest.getUsername(), appUser.getRole()));
    }

}

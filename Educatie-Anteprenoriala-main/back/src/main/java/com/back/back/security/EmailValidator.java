package com.back.back.security;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class EmailValidator {
    public Boolean validateEmail(String email) {
        String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";

        Pattern pattern = Pattern.compile(regex);

        return pattern.matcher(email).matches();
    }
}
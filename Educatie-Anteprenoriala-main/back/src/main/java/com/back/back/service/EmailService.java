package com.back.back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void send(String to, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("educatie.antreprenoriala2@gmail.com");
        message.setTo(to);
        message.setSubject("Confirmare Cont");
        message.setText(email);
        mailSender.send(message);
        System.out.println("here4");
    }
}

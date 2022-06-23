package com.back.back;

import com.back.back.util.StorageProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@RequiredArgsConstructor
@EnableConfigurationProperties(StorageProperties.class)
public class BackApplication{

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}
}

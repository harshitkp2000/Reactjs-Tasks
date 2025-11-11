package com.example.E_commerce_b;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ECommerceBApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceBApplication.class, args);
	}

}

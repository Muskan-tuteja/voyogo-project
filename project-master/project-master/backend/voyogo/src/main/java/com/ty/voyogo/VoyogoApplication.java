package com.ty.voyogo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VoyogoApplication {

	public static void main(String[] args) {
		SpringApplication.run(VoyogoApplication.class, args);
	}

}

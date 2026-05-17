package com.ty.voyogo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;



import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

    @Configuration
    // Disable in prod
    public class OpenApiConfig {

        @Bean
        public OpenAPI customOpenAPI() {
            return new OpenAPI()
                    .info(new Info()
                            .title("Voyago API")
                            .version("v1.0.0")
                            .description("Enterprise Bus Booking API Documentation")
                            .contact(new Contact()
                                    .name("Backend Team")
                                    .email("anwithgowda2@gmail.com"))
                            .license(new License()
                                    .name("Education purpose only")
                                    .url("https://localhost:8000/app")));
        }
    }


package net.javaguides.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow QA/Prod frontends in Azure and local dev
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "https://students-front-qa-ffb5fxf5chepfwgz.brazilsouth-01.azurewebsites.net",
                                "https://students-front-prod-gmeaaxbsgrbsbacv.brazilsouth-01.azurewebsites.net",
                                "http://localhost:3000"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(false);
            }
        };
    }
}

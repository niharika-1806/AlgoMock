package com.algomock.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Used by AuthService for password hashing and verification
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Defines our application's HTTP security rules
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                // We are building a REST API, so disable CSRF for now
                .csrf(csrf -> csrf.disable())

                // We are not using Spring Security's default login page
                .formLogin(form -> form.disable())

                // We are not using HTTP Basic authentication
                .httpBasic(basic -> basic.disable())

                // Define which endpoints are publicly accessible
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/dashboard"
                        ).permitAll()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
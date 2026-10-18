package com.algomock.backend.config;

import com.algomock.backend.model.User;
import com.algomock.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class AdminAccountInitializer {

    @Bean
    public CommandLineRunner initAdminAccount(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            String adminEmail = "niharika@algomock.com";
            User admin = userRepository.findByEmail(adminEmail).orElse(null);

            if (admin == null) {
                admin = new User();
                admin.setName("Niharika");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("Admin@1806"));
                admin.setRole("ADMIN");
                admin.setProblemsSolved(0);
                admin.setCodeReviews(0);
                admin.setMockInterviews(0);
                admin.setDailyStreak(0);
                admin.setCreatedAt(LocalDateTime.now());
                userRepository.save(admin);
                System.out.println("[AlgoMock] Initialized sole administrator account: " + adminEmail);
            } else {
                admin.setName("Niharika");
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }
        };
    }
}

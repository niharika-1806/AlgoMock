package com.algomock.backend.service;

import com.algomock.backend.dto.RegisterRequest;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.algomock.backend.dto.RegisterResponse;
import com.algomock.backend.dto.LoginRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse register(RegisterRequest request){
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }
    public User login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            return null;
        }

        return user;
    }
}
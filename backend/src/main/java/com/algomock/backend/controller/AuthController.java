package com.algomock.backend.controller;

import com.algomock.backend.dto.RegisterRequest;
import com.algomock.backend.model.User;
import com.algomock.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.algomock.backend.dto.RegisterResponse;
import com.algomock.backend.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest request
    ) {

        RegisterResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        User user = authService.login(request);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(
                new RegisterResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                )
        );
    }
}
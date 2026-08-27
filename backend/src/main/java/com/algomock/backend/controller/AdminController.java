package com.algomock.backend.controller;

import com.algomock.backend.dto.AdminStatsResponse;
import com.algomock.backend.dto.AdminUserDetailsResponse;
import com.algomock.backend.dto.AdminUserDto;
import com.algomock.backend.dto.CodeReviewResponse;
import com.algomock.backend.dto.MockInterviewResponse;
import com.algomock.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        adminService.verifyAdmin(userId);
        return ResponseEntity.ok(adminService.getPlatformStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserDto>> getUsers(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        adminService.verifyAdmin(userId);
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<AdminUserDetailsResponse> getUserDetails(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long userId
    ) {
        Long requesterId = Long.parseLong(jwt.getSubject());
        adminService.verifyAdmin(requesterId);
        return ResponseEntity.ok(adminService.getUserDetails(userId));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<CodeReviewResponse>> getAllReviews(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        adminService.verifyAdmin(userId);
        return ResponseEntity.ok(adminService.getAllReviews());
    }

    @GetMapping("/interviews")
    public ResponseEntity<List<MockInterviewResponse>> getAllInterviews(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        adminService.verifyAdmin(userId);
        return ResponseEntity.ok(adminService.getAllInterviews());
    }
}

package com.algomock.backend.controller;

import com.algomock.backend.dto.MockInterviewRequest;
import com.algomock.backend.dto.MockInterviewResponse;
import com.algomock.backend.service.MockInterviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import com.algomock.backend.dto.MockInterviewAnswerRequest;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class MockInterviewController {

    private final MockInterviewService mockInterviewService;

    public MockInterviewController(
            MockInterviewService mockInterviewService
    ) {
        this.mockInterviewService = mockInterviewService;
    }

    @PostMapping
    public ResponseEntity<MockInterviewResponse> startInterview(
            @RequestBody MockInterviewRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) throws Exception {

        Long userId = Long.parseLong(jwt.getSubject());

        MockInterviewResponse response =
                mockInterviewService.startInterview(
                        request,
                        userId
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @PostMapping("/{id}/answer")
    public ResponseEntity<MockInterviewResponse> submitAnswer(
            @PathVariable Long id,
            @RequestBody MockInterviewAnswerRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) throws Exception {

        Long userId = Long.parseLong(jwt.getSubject());

        MockInterviewResponse response =
                mockInterviewService.submitAnswer(
                        id,
                        userId,
                        request.getAnswer()
                );

        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<List<MockInterviewResponse>> getInterviewHistory(
            @AuthenticationPrincipal Jwt jwt
    ) {

        Long userId = Long.parseLong(jwt.getSubject());

        List<MockInterviewResponse> interviews =
                mockInterviewService.getInterviewHistory(userId);

        return ResponseEntity.ok(interviews);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MockInterviewResponse> getInterviewById(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt
    ) {

        Long userId = Long.parseLong(jwt.getSubject());

        MockInterviewResponse response =
                mockInterviewService.getInterviewById(
                        id,
                        userId
                );

        return ResponseEntity.ok(response);
    }
}
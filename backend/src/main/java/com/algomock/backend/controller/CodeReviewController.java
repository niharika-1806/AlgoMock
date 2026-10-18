package com.algomock.backend.controller;

import com.algomock.backend.dto.CodeReviewRequest;
import com.algomock.backend.dto.CodeReviewResponse;
import com.algomock.backend.service.CodeReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class CodeReviewController {

    private final CodeReviewService codeReviewService;

    public CodeReviewController(CodeReviewService codeReviewService) {
        this.codeReviewService = codeReviewService;
    }

    @PostMapping
    public ResponseEntity<CodeReviewResponse> createReview(
            @RequestBody CodeReviewRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) throws  Exception{

        Long userId = Long.parseLong(jwt.getSubject());

        CodeReviewResponse response =
                codeReviewService.createReview(request, userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @GetMapping
    public ResponseEntity<List<CodeReviewResponse>> getReviewHistory(
            @AuthenticationPrincipal Jwt jwt
    ) throws Exception {

        Long userId = Long.parseLong(jwt.getSubject());

        List<CodeReviewResponse> reviews =
                codeReviewService.getReviewHistory(userId);

        return ResponseEntity.ok(reviews);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CodeReviewResponse> getReviewById(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt
    ) {

        Long userId = Long.parseLong(jwt.getSubject());

        CodeReviewResponse review =
                codeReviewService.getReviewById(id, userId);

        return ResponseEntity.ok(review);
    }
}
package com.algomock.backend.service;

import com.algomock.backend.dto.CodeReviewRequest;
import com.algomock.backend.dto.CodeReviewResponse;
import com.algomock.backend.dto.GeminiReviewResponse;
import com.algomock.backend.model.CodeReview;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.CodeReviewRepository;
import com.algomock.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.algomock.backend.model.Activity;
import com.algomock.backend.repository.ActivityRepository;

import java.time.LocalDateTime;

@Service
public class CodeReviewService {

    private final CodeReviewRepository codeReviewRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;
    private final ActivityRepository activityRepository;

    public CodeReviewService(
            CodeReviewRepository codeReviewRepository,
            UserRepository userRepository,
            GeminiService geminiService,
            ActivityRepository activityRepository
    ) {
        this.codeReviewRepository = codeReviewRepository;
        this.userRepository = userRepository;
        this.geminiService = geminiService;
        this.activityRepository = activityRepository;
    }

    public CodeReviewResponse createReview(
            CodeReviewRequest request,
            Long userId
    ) throws Exception {

        // Find the logged-in user using the ID from the JWT
        User user = userRepository
                .findById(userId)
                .orElseThrow();

        // Send problem + code to Gemini
        GeminiReviewResponse aiReview =
                geminiService.reviewCode(
                        request.getProblem(),
                        request.getCode()
                );

        // Create CodeReview entity
        CodeReview review = new CodeReview();

        review.setProblem(request.getProblem());
        review.setCode(request.getCode());

        // Save structured AI response
        review.setScore(aiReview.getScore());
        review.setSummary(aiReview.getSummary());
        review.setCorrectness(aiReview.getCorrectness());
        review.setTimeComplexity(aiReview.getTimeComplexity());
        review.setSpaceComplexity(aiReview.getSpaceComplexity());

        // Store list values as text for now
        review.setStrengths(
                String.join("\n", aiReview.getStrengths())
        );

        review.setImprovements(
                String.join("\n", aiReview.getImprovements())
        );

        review.setCreatedAt(LocalDateTime.now());
        review.setUser(user);

        // Save to PostgreSQL
        CodeReview savedReview =
                codeReviewRepository.save(review);
        Activity activity = new Activity();

        activity.setText("Completed an AI code review");
        activity.setTime("Just now");
        activity.setUser(user);

        activityRepository.save(activity);

        // Return response to frontend
        return new CodeReviewResponse(
                savedReview.getId(),
                savedReview.getProblem(),
                savedReview.getCode(),
                savedReview.getScore(),
                savedReview.getSummary(),
                savedReview.getCorrectness(),
                savedReview.getTimeComplexity(),
                savedReview.getSpaceComplexity(),
                aiReview.getStrengths(),
                aiReview.getImprovements(),
                savedReview.getCreatedAt()
        );
    }
    public List<CodeReviewResponse> getReviewHistory(Long userId) {

        List<CodeReview> reviews =
                codeReviewRepository.findByUserId(userId);

        return reviews.stream()
                .map(review -> new CodeReviewResponse(
                        review.getId(),
                        review.getProblem(),
                        review.getCode(),
                        review.getScore(),
                        review.getSummary(),
                        review.getCorrectness(),
                        review.getTimeComplexity(),
                        review.getSpaceComplexity(),
                        convertToList(review.getStrengths()),
                        convertToList(review.getImprovements()),
                        review.getCreatedAt()
                ))
                .toList();
    }
    private List<String> convertToList(String value) {

        if (value == null || value.isBlank()) {
            return List.of();
        }

        return List.of(value.split("\\R"));
    }
    public CodeReviewResponse getReviewById(Long reviewId, Long userId) {

        CodeReview review =
                codeReviewRepository
                        .findByIdAndUserId(reviewId, userId)
                        .orElseThrow();

        return new CodeReviewResponse(
                review.getId(),
                review.getProblem(),
                review.getCode(),
                review.getScore(),
                review.getSummary(),
                review.getCorrectness(),
                review.getTimeComplexity(),
                review.getSpaceComplexity(),
                convertToList(review.getStrengths()),
                convertToList(review.getImprovements()),
                review.getCreatedAt()
        );
    }
}
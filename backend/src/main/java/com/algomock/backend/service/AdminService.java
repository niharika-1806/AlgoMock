package com.algomock.backend.service;

import com.algomock.backend.dto.*;
import com.algomock.backend.model.CodeReview;
import com.algomock.backend.model.MockInterview;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.CodeReviewRepository;
import com.algomock.backend.repository.MockInterviewRepository;
import com.algomock.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CodeReviewRepository codeReviewRepository;
    private final MockInterviewRepository mockInterviewRepository;

    public AdminService(
            UserRepository userRepository,
            CodeReviewRepository codeReviewRepository,
            MockInterviewRepository mockInterviewRepository
    ) {
        this.userRepository = userRepository;
        this.codeReviewRepository = codeReviewRepository;
        this.mockInterviewRepository = mockInterviewRepository;
    }

    public void verifyAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (user.getRole() == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied: Administrator privileges required.");
        }
    }

    public AdminStatsResponse getPlatformStats() {
        long totalUsers = userRepository.count();
        long totalReviews = codeReviewRepository.count();
        long totalInterviews = mockInterviewRepository.count();

        Double avgReviewScore = codeReviewRepository.getOverallAverageScore();
        Double avgInterviewScore = mockInterviewRepository.getOverallAverageScore();

        long totalProblemsSolved = userRepository.findAll().stream()
                .mapToLong(User::getProblemsSolved)
                .sum();

        return new AdminStatsResponse(
                totalUsers,
                totalReviews,
                totalInterviews,
                avgReviewScore != null ? Math.round(avgReviewScore * 10.0) / 10.0 : 0.0,
                avgInterviewScore != null ? Math.round(avgInterviewScore * 10.0) / 10.0 : 0.0,
                totalProblemsSolved
        );
    }

    public List<AdminUserDto> getAllUsers() {
        List<User> users = userRepository.findAllByOrderByIdDesc();

        return users.stream().map(this::mapToAdminUserDto).toList();
    }

    public AdminUserDetailsResponse getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        AdminUserDto userDto = mapToAdminUserDto(user);

        List<CodeReviewResponse> reviews = codeReviewRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToCodeReviewResponse)
                .toList();

        List<MockInterviewResponse> interviews = mockInterviewRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToMockInterviewResponse)
                .toList();

        return new AdminUserDetailsResponse(userDto, reviews, interviews);
    }

    public List<CodeReviewResponse> getAllReviews() {
        return codeReviewRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToCodeReviewResponse)
                .toList();
    }

    public List<MockInterviewResponse> getAllInterviews() {
        return mockInterviewRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToMockInterviewResponse)
                .toList();
    }

    private AdminUserDto mapToAdminUserDto(User user) {
        long reviewsCount = codeReviewRepository.countByUserId(user.getId());
        long interviewsCount = mockInterviewRepository.countByUserId(user.getId());
        Double avgReviewScore = codeReviewRepository.getAverageScoreByUserId(user.getId());
        Double avgInterviewScore = mockInterviewRepository.getAverageScoreByUserId(user.getId());

        return new AdminUserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole() != null ? user.getRole() : "USER",
                user.getProblemsSolved(),
                user.getDailyStreak(),
                reviewsCount,
                interviewsCount,
                avgReviewScore != null ? Math.round(avgReviewScore * 10.0) / 10.0 : null,
                avgInterviewScore != null ? Math.round(avgInterviewScore * 10.0) / 10.0 : null,
                user.getCreatedAt()
        );
    }

    private CodeReviewResponse mapToCodeReviewResponse(CodeReview review) {
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

    private MockInterviewResponse mapToMockInterviewResponse(MockInterview interview) {
        return new MockInterviewResponse(
                interview.getId(),
                interview.getTopic(),
                interview.getQuestion(),
                interview.getAnswer(),
                interview.getScore(),
                interview.getFeedback(),
                convertToList(interview.getStrengths()),
                convertToList(interview.getImprovements()),
                interview.getCreatedAt()
        );
    }

    private List<String> convertToList(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return List.of(value.split("\\R"));
    }
}

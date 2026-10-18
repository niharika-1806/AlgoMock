package com.algomock.backend.dto;

import java.time.LocalDateTime;

public class AdminUserDto {

    private Long id;
    private String name;
    private String email;
    private String role;
    private int problemsSolved;
    private int dailyStreak;
    private long codeReviewsCount;
    private long mockInterviewsCount;
    private Double avgReviewScore;
    private Double avgInterviewScore;
    private LocalDateTime createdAt;

    public AdminUserDto() {
    }

    public AdminUserDto(
            Long id,
            String name,
            String email,
            String role,
            int problemsSolved,
            int dailyStreak,
            long codeReviewsCount,
            long mockInterviewsCount,
            Double avgReviewScore,
            Double avgInterviewScore,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.problemsSolved = problemsSolved;
        this.dailyStreak = dailyStreak;
        this.codeReviewsCount = codeReviewsCount;
        this.mockInterviewsCount = mockInterviewsCount;
        this.avgReviewScore = avgReviewScore;
        this.avgInterviewScore = avgInterviewScore;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(int problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public int getDailyStreak() {
        return dailyStreak;
    }

    public void setDailyStreak(int dailyStreak) {
        this.dailyStreak = dailyStreak;
    }

    public long getCodeReviewsCount() {
        return codeReviewsCount;
    }

    public void setCodeReviewsCount(long codeReviewsCount) {
        this.codeReviewsCount = codeReviewsCount;
    }

    public long getMockInterviewsCount() {
        return mockInterviewsCount;
    }

    public void setMockInterviewsCount(long mockInterviewsCount) {
        this.mockInterviewsCount = mockInterviewsCount;
    }

    public Double getAvgReviewScore() {
        return avgReviewScore;
    }

    public void setAvgReviewScore(Double avgReviewScore) {
        this.avgReviewScore = avgReviewScore;
    }

    public Double getAvgInterviewScore() {
        return avgInterviewScore;
    }

    public void setAvgInterviewScore(Double avgInterviewScore) {
        this.avgInterviewScore = avgInterviewScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

package com.algomock.backend.dto;

public class AdminStatsResponse {

    private long totalUsers;
    private long totalCodeReviews;
    private long totalMockInterviews;
    private Double averageCodeReviewScore;
    private Double averageMockInterviewScore;
    private long totalProblemsSolved;

    public AdminStatsResponse() {
    }

    public AdminStatsResponse(
            long totalUsers,
            long totalCodeReviews,
            long totalMockInterviews,
            Double averageCodeReviewScore,
            Double averageMockInterviewScore,
            long totalProblemsSolved
    ) {
        this.totalUsers = totalUsers;
        this.totalCodeReviews = totalCodeReviews;
        this.totalMockInterviews = totalMockInterviews;
        this.averageCodeReviewScore = averageCodeReviewScore;
        this.averageMockInterviewScore = averageMockInterviewScore;
        this.totalProblemsSolved = totalProblemsSolved;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCodeReviews() {
        return totalCodeReviews;
    }

    public void setTotalCodeReviews(long totalCodeReviews) {
        this.totalCodeReviews = totalCodeReviews;
    }

    public long getTotalMockInterviews() {
        return totalMockInterviews;
    }

    public void setTotalMockInterviews(long totalMockInterviews) {
        this.totalMockInterviews = totalMockInterviews;
    }

    public Double getAverageCodeReviewScore() {
        return averageCodeReviewScore;
    }

    public void setAverageCodeReviewScore(Double averageCodeReviewScore) {
        this.averageCodeReviewScore = averageCodeReviewScore;
    }

    public Double getAverageMockInterviewScore() {
        return averageMockInterviewScore;
    }

    public void setAverageMockInterviewScore(Double averageMockInterviewScore) {
        this.averageMockInterviewScore = averageMockInterviewScore;
    }

    public long getTotalProblemsSolved() {
        return totalProblemsSolved;
    }

    public void setTotalProblemsSolved(long totalProblemsSolved) {
        this.totalProblemsSolved = totalProblemsSolved;
    }
}

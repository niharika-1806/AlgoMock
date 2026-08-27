package com.algomock.backend.dto;

import java.util.List;

public class AdminUserDetailsResponse {

    private AdminUserDto user;
    private List<CodeReviewResponse> reviews;
    private List<MockInterviewResponse> interviews;

    public AdminUserDetailsResponse() {
    }

    public AdminUserDetailsResponse(
            AdminUserDto user,
            List<CodeReviewResponse> reviews,
            List<MockInterviewResponse> interviews
    ) {
        this.user = user;
        this.reviews = reviews;
        this.interviews = interviews;
    }

    public AdminUserDto getUser() {
        return user;
    }

    public void setUser(AdminUserDto user) {
        this.user = user;
    }

    public List<CodeReviewResponse> getReviews() {
        return reviews;
    }

    public void setReviews(List<CodeReviewResponse> reviews) {
        this.reviews = reviews;
    }

    public List<MockInterviewResponse> getInterviews() {
        return interviews;
    }

    public void setInterviews(List<MockInterviewResponse> interviews) {
        this.interviews = interviews;
    }
}

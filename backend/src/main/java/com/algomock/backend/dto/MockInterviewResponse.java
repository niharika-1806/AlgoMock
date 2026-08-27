package com.algomock.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class MockInterviewResponse {

    private Long id;
    private String topic;
    private String question;
    private String answer;
    private Integer score;
    private String feedback;
    private List<String> strengths;
    private List<String> improvements;
    private LocalDateTime createdAt;

    public MockInterviewResponse(
            Long id,
            String topic,
            String question,
            String answer,
            Integer score,
            String feedback,
            List<String> strengths,
            List<String> improvements,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.topic = topic;
        this.question = question;
        this.answer = answer;
        this.score = score;
        this.feedback = feedback;
        this.strengths = strengths;
        this.improvements = improvements;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Integer getScore() {
        return score;
    }

    public String getFeedback() {
        return feedback;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public List<String> getImprovements() {
        return improvements;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
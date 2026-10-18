package com.algomock.backend.dto;

import java.util.List;

public class GeminiInterviewEvaluationResponse {

    private Integer score;
    private String feedback;
    private List<String> strengths;
    private List<String> improvements;

    public GeminiInterviewEvaluationResponse() {
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getImprovements() {
        return improvements;
    }

    public void setImprovements(List<String> improvements) {
        this.improvements = improvements;
    }
}
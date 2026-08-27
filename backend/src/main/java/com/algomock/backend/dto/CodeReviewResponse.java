package com.algomock.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CodeReviewResponse {

    private Long id;
    private String problem;
    private String code;
    private Integer score;
    private String summary;
    private String correctness;
    private String timeComplexity;
    private String spaceComplexity;
    private List<String> strengths;
    private List<String> improvements;
    private LocalDateTime createdAt;

    public CodeReviewResponse(
            Long id,
            String problem,
            String code,
            Integer score,
            String summary,
            String correctness,
            String timeComplexity,
            String spaceComplexity,
            List<String> strengths,
            List<String> improvements,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.problem = problem;
        this.code = code;
        this.score = score;
        this.summary = summary;
        this.correctness = correctness;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
        this.strengths = strengths;
        this.improvements = improvements;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getProblem() {
        return problem;
    }

    public String getCode() {
        return code;
    }

    public Integer getScore() {
        return score;
    }

    public String getSummary() {
        return summary;
    }

    public String getCorrectness() {
        return correctness;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
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
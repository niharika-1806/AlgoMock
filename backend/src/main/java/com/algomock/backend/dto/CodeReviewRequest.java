package com.algomock.backend.dto;

public class CodeReviewRequest {

    private String problem;
    private String code;

    public CodeReviewRequest() {
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
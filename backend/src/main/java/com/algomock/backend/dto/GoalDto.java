package com.algomock.backend.dto;

public class GoalDto {

    private String title;
    private String progress;
    private String description;

    public GoalDto(String title, String progress, String description) {
        this.title = title;
        this.progress = progress;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getProgress() {
        return progress;
    }

    public String getDescription() {
        return description;
    }
}
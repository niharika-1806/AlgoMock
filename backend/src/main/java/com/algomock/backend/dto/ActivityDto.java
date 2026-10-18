package com.algomock.backend.dto;

public class ActivityDto {

    private String text;
    private String time;

    public ActivityDto(String text, String time) {
        this.text = text;
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public String getTime() {
        return time;
    }
}
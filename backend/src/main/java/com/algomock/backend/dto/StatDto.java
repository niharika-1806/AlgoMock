package com.algomock.backend.dto;

public class StatDto {

    private String title;
    private int value;

    public StatDto(String title, int value) {
        this.title = title;
        this.value = value;
    }

    public String getTitle() {
        return title;
    }

    public int getValue() {
        return value;
    }
}
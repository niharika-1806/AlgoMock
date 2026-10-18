//This is created to represent the data that we want to send back.
// Why created two different files? Request models and response models don't necessarily have to be the same object.
//Though we can return the data back with the same file it came as request.


package com.algomock.backend.model;

public class UserResponse {

    private int id;
    private String name;
    private int age;

    public UserResponse(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
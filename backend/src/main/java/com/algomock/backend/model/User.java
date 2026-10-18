// This is created to represent the data coming into our backend from the request body.

package com.algomock.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

//Entity tells JPA that this class should be mapped to database table
@Entity
@Table(name="users")
public class User {

    @Id // means this field is a primary key
//    means let the database generate the id automatically
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int age;


    @Column(unique = true, nullable = false)
    private String email;


    private int problemsSolved;

    private int mockInterviews;

    private int codeReviews;

    private int dailyStreak;

    private String password;

//    JPA requires no argument constructor for entity instantiation.
    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


    public int getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(int problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public int getMockInterviews() {
        return mockInterviews;
    }

    public void setMockInterviews(int mockInterviews) {
        this.mockInterviews = mockInterviews;
    }

    public int getCodeReviews() {
        return codeReviews;
    }

    public void setCodeReviews(int codeReviews) {
        this.codeReviews = codeReviews;
    }

    public int getDailyStreak() {
        return dailyStreak;
    }

    public void setDailyStreak(int dailyStreak) {
        this.dailyStreak = dailyStreak;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



}


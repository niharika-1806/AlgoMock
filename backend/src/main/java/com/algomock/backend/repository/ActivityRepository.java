package com.algomock.backend.repository;

import com.algomock.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserId(Long userId);
}
package com.algomock.backend.repository;

import com.algomock.backend.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    Optional<Goal> findFirstByUserId(Long userId);
}
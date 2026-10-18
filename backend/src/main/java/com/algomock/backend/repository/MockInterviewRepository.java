package com.algomock.backend.repository;

import com.algomock.backend.model.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MockInterviewRepository
        extends JpaRepository<MockInterview, Long> {

    List<MockInterview> findByUserId(Long userId);
    List<MockInterview> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<MockInterview> findAllByOrderByCreatedAtDesc();

    Optional<MockInterview> findByIdAndUserId(
            Long id,
            Long userId
    );
    long countByUserId(Long userId);

    @Query("""
       SELECT AVG(m.score)
       FROM MockInterview m
       WHERE m.user.id = :userId
       """)
    Double getAverageScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT AVG(m.score) FROM MockInterview m")
    Double getOverallAverageScore();
}
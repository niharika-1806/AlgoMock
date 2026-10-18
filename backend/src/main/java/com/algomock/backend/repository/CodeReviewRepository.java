package com.algomock.backend.repository;

import com.algomock.backend.model.CodeReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CodeReviewRepository extends JpaRepository<CodeReview, Long> {

    List<CodeReview> findByUserId(Long userId);
    List<CodeReview> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<CodeReview> findAllByOrderByCreatedAtDesc();
    Optional<CodeReview> findByIdAndUserId(Long id, Long userId);
    long countByUserId(Long userId);

    @Query("""
       SELECT AVG(r.score)
       FROM CodeReview r
       WHERE r.user.id = :userId
       """)
    Double getAverageScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT AVG(r.score) FROM CodeReview r")
    Double getOverallAverageScore();
}
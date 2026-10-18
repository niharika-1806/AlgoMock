package com.algomock.backend.service;

import com.algomock.backend.dto.DashboardResponse;
import com.algomock.backend.dto.StatDto;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.CodeReviewRepository;
import com.algomock.backend.repository.MockInterviewRepository;
import com.algomock.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final CodeReviewRepository codeReviewRepository;
    private final MockInterviewRepository mockInterviewRepository;

    public DashboardService(
            UserRepository userRepository,
            CodeReviewRepository codeReviewRepository,
            MockInterviewRepository mockInterviewRepository
    ) {
        this.userRepository = userRepository;
        this.codeReviewRepository = codeReviewRepository;
        this.mockInterviewRepository = mockInterviewRepository;
    }

    public DashboardResponse getDashboard(Long userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        long codeReviewCount =
                codeReviewRepository.countByUserId(userId);

        long mockInterviewCount =
                mockInterviewRepository.countByUserId(userId);

        Double averageReviewScore =
                codeReviewRepository.getAverageScoreByUserId(userId);

        Double averageInterviewScore =
                mockInterviewRepository.getAverageScoreByUserId(userId);

        int reviewAverage =
                averageReviewScore == null
                        ? 0
                        : (int) Math.round(averageReviewScore);

        int interviewAverage =
                averageInterviewScore == null
                        ? 0
                        : (int) Math.round(averageInterviewScore);

        List<StatDto> stats = List.of(

                new StatDto(
                        "AI Code Reviews",
                        String.valueOf(codeReviewCount)
                ),

                new StatDto(
                        "Mock Interviews",
                        String.valueOf(mockInterviewCount)
                ),

                new StatDto(
                        "Avg Review Score",
                        reviewAverage + "/100"
                ),

                new StatDto(
                        "Avg Interview Score",
                        interviewAverage + "/100"
                )
        );

        return new DashboardResponse(
                user.getName(),
                user.getRole() != null ? user.getRole() : "USER",
                stats
        );
    }
}
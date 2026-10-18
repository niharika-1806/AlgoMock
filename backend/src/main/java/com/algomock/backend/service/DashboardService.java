package com.algomock.backend.service;

import com.algomock.backend.dto.ActivityDto;
import com.algomock.backend.dto.DashboardResponse;
import com.algomock.backend.dto.GoalDto;
import com.algomock.backend.dto.StatDto;
import org.springframework.stereotype.Service;

import java.util.List;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.UserRepository;
import com.algomock.backend.repository.ActivityRepository;
import com.algomock.backend.model.Activity;
import com.algomock.backend.model.Goal;
import com.algomock.backend.repository.GoalRepository;


@Service
public class DashboardService {
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final GoalRepository goalRepository;

    public DashboardService(
            UserRepository userRepository,
            ActivityRepository activityRepository,
            GoalRepository goalRepository
    ) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.goalRepository = goalRepository;
    }

    public DashboardResponse getDashboard() {
        User user = userRepository.findById(2L).orElseThrow();

        List<StatDto> stats = List.of(
                new StatDto("Problems Solved", user.getProblemsSolved()),
                new StatDto("Mock Interviews", user.getMockInterviews()),
                new StatDto("Code Reviews", user.getCodeReviews()),
                new StatDto("Daily Streak", user.getDailyStreak())
        );

        List<Activity> activityEntities =
                activityRepository.findByUserId(2L);
        List<ActivityDto> activities = activityEntities.stream()
                .map(activity ->
                        new ActivityDto(
                                activity.getText(),
                                activity.getTime()
                        )
                )
                .toList();

        Goal goal = goalRepository
                .findFirstByUserId(2L)
                .orElseThrow();

        GoalDto goalDto = new GoalDto(
                goal.getTitle(),
                goal.getProgress(),
                goal.getDescription()
        );

        return new DashboardResponse(
                stats,
                activities,
                goalDto
        );
    }
}
package com.algomock.backend.dto;

import java.util.List;

public class DashboardResponse {

    private List<StatDto> stats;
    private List<ActivityDto> activities;
    private GoalDto goal;

    public DashboardResponse(
            List<StatDto> stats,
            List<ActivityDto> activities,
            GoalDto goal
    ) {
        this.stats = stats;
        this.activities = activities;
        this.goal = goal;
    }

    public List<StatDto> getStats() {
        return stats;
    }

    public List<ActivityDto> getActivities() {
        return activities;
    }

    public GoalDto getGoal() {
        return goal;
    }
}
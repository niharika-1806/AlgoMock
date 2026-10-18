package com.algomock.backend.dto;

import java.util.List;

public class DashboardResponse {

    private String userName;
    private String userRole;
    private List<StatDto> stats;

    public DashboardResponse() {
    }

    public DashboardResponse(
            String userName,
            List<StatDto> stats
    ) {
        this.userName = userName;
        this.userRole = "USER";
        this.stats = stats;
    }

    public DashboardResponse(
            String userName,
            String userRole,
            List<StatDto> stats
    ) {
        this.userName = userName;
        this.userRole = userRole;
        this.stats = stats;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public List<StatDto> getStats() {
        return stats;
    }
}
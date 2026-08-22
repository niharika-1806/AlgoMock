package com.algomock.backend.dashboard;

import com.algomock.backend.dto.DashboardResponse;
import com.algomock.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {

        DashboardResponse dashboard =
                dashboardService.getDashboard();

        return ResponseEntity.ok(dashboard);
    }
}
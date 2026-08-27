package com.algomock.backend.service;

import com.algomock.backend.dto.MockInterviewRequest;
import com.algomock.backend.dto.MockInterviewResponse;
import com.algomock.backend.model.MockInterview;
import com.algomock.backend.model.User;
import com.algomock.backend.repository.MockInterviewRepository;
import com.algomock.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.algomock.backend.dto.GeminiInterviewEvaluationResponse;
import com.algomock.backend.model.Activity;
import com.algomock.backend.repository.ActivityRepository;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class MockInterviewService {

    private final MockInterviewRepository mockInterviewRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;
    private final ActivityRepository activityRepository;

    public MockInterviewService(
            MockInterviewRepository mockInterviewRepository,
            UserRepository userRepository,
            GeminiService geminiService,
            ActivityRepository activityRepository
    ) {
        this.mockInterviewRepository = mockInterviewRepository;
        this.userRepository = userRepository;
        this.geminiService = geminiService;
        this.activityRepository = activityRepository;
    }

    public MockInterviewResponse startInterview(
            MockInterviewRequest request,
            Long userId
    ) throws Exception {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        String question =
                geminiService.generateInterviewQuestion(
                        request.getTopic()
                );

        MockInterview interview = new MockInterview();

        interview.setTopic(request.getTopic());
        interview.setQuestion(question);
        interview.setScore(0);
        interview.setFeedback("Interview in progress.");
        interview.setCreatedAt(LocalDateTime.now());
        interview.setUser(user);

        MockInterview savedInterview =
                mockInterviewRepository.save(interview);

        return new MockInterviewResponse(
                savedInterview.getId(),
                savedInterview.getTopic(),
                savedInterview.getQuestion(),
                savedInterview.getAnswer(),
                savedInterview.getScore(),
                savedInterview.getFeedback(),
                convertToList(savedInterview.getStrengths()),
                convertToList(savedInterview.getImprovements()),
                savedInterview.getCreatedAt()
        );
    }
    public MockInterviewResponse submitAnswer(
            Long interviewId,
            Long userId,
            String answer
    ) throws Exception {

        MockInterview interview =
                mockInterviewRepository
                        .findByIdAndUserId(interviewId, userId)
                        .orElseThrow();

        GeminiInterviewEvaluationResponse evaluation =
                geminiService.evaluateInterviewAnswer(
                        interview.getQuestion(),
                        answer
                );

        interview.setAnswer(answer);

        interview.setScore(
                evaluation.getScore()
        );

        interview.setFeedback(
                evaluation.getFeedback()
        );
        interview.setAnswer(answer);
        interview.setScore(evaluation.getScore());
        interview.setFeedback(evaluation.getFeedback());

        interview.setStrengths(
                String.join("\n", evaluation.getStrengths())
        );

        interview.setImprovements(
                String.join("\n", evaluation.getImprovements())
        );

        MockInterview savedInterview =
                mockInterviewRepository.save(interview);
        Activity activity = new Activity();

        activity.setText("Completed an AI mock interview");
        activity.setTime("Just now");
        activity.setUser(interview.getUser());

        activityRepository.save(activity);

        return new MockInterviewResponse(
                savedInterview.getId(),
                savedInterview.getTopic(),
                savedInterview.getQuestion(),
                savedInterview.getAnswer(),
                savedInterview.getScore(),
                savedInterview.getFeedback(),
                convertToList(savedInterview.getStrengths()),
                convertToList(savedInterview.getImprovements()),
                savedInterview.getCreatedAt()
        );
    }
    private List<String> convertToList(String value) {

        if (value == null || value.isBlank()) {
            return List.of();
        }

        return List.of(value.split("\\R"));
    }
    public List<MockInterviewResponse> getInterviewHistory(Long userId) {

        List<MockInterview> interviews =
                mockInterviewRepository.findByUserId(userId);

        return interviews.stream()
                .map(interview -> new MockInterviewResponse(
                        interview.getId(),
                        interview.getTopic(),
                        interview.getQuestion(),
                        interview.getAnswer(),
                        interview.getScore(),
                        interview.getFeedback(),
                        convertToList(interview.getStrengths()),
                        convertToList(interview.getImprovements()),
                        interview.getCreatedAt()
                ))
                .toList();
    }
    public MockInterviewResponse getInterviewById(
            Long interviewId,
            Long userId
    ) {

        MockInterview interview =
                mockInterviewRepository
                        .findByIdAndUserId(interviewId, userId)
                        .orElseThrow();

        return new MockInterviewResponse(
                interview.getId(),
                interview.getTopic(),
                interview.getQuestion(),
                interview.getAnswer(),
                interview.getScore(),
                interview.getFeedback(),
                convertToList(interview.getStrengths()),
                convertToList(interview.getImprovements()),
                interview.getCreatedAt()
        );
    }
}
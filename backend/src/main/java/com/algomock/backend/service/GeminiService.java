package com.algomock.backend.service;

import com.algomock.backend.dto.GeminiReviewResponse;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tools.jackson.databind.json.JsonMapper;
import com.algomock.backend.dto.GeminiInterviewEvaluationResponse;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private static final Logger log = LoggerFactory.getLogger(GeminiService.class);
    private final Client client;
    private final JsonMapper jsonMapper;
    private final String primaryModelName;
    private final List<String> fallbackModels = List.of(
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-2.5-flash-lite"
    );

    public GeminiService(
            @Value("${app.gemini.api-key}") String apiKey,
            @Value("${app.gemini.model:gemini-2.5-flash}") String modelName,
            JsonMapper jsonMapper
    ) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.primaryModelName = (modelName == null || modelName.contains("3.5")) ? "gemini-2.5-flash" : modelName;
        this.jsonMapper = jsonMapper;
    }

    private GenerateContentResponse callGeminiWithFallback(String prompt, GenerateContentConfig config) throws Exception {
        Exception lastException = null;

        // Try primary model first
        try {
            return client.models.generateContent(this.primaryModelName, prompt, config);
        } catch (Exception e) {
            log.warn("Primary Gemini model '{}' failed: {}. Trying fallback models...", this.primaryModelName, e.getMessage());
            lastException = e;
        }

        // Try fallback models sequentially
        for (String fallback : fallbackModels) {
            if (fallback.equalsIgnoreCase(this.primaryModelName)) {
                continue;
            }
            try {
                log.info("Attempting Gemini request with fallback model '{}'", fallback);
                return client.models.generateContent(fallback, prompt, config);
            } catch (Exception e) {
                log.warn("Fallback model '{}' failed: {}", fallback, e.getMessage());
                lastException = e;
            }
        }

        throw new RuntimeException("All Gemini AI models are currently busy. Please retry in a few seconds.", lastException);
    }

    public GeminiReviewResponse reviewCode(
            String problem,
            String code
    ) throws Exception {

        String prompt = """
                Act as a senior technical interviewer reviewing a candidate's coding interview solution.

                Problem:
                %s

                Candidate Code:
                %s

                Evaluate the solution carefully.

                Consider:
                - Correctness
                - Time complexity
                - Space complexity
                - Code quality
                - Edge cases
                - Interview readiness

                Give a score from 0 to 100.

                Keep the summary and feedback concise but useful.
                Identify the strongest aspects of the solution.
                Identify the most important improvements the candidate should make.
                """.formatted(problem, code);

        Schema stringSchema = Schema.builder()
                .type("STRING")
                .build();

        Schema integerSchema = Schema.builder()
                .type("INTEGER")
                .build();

        Schema strengthsSchema = Schema.builder()
                .type("ARRAY")
                .items(stringSchema)
                .build();

        Schema improvementsSchema = Schema.builder()
                .type("ARRAY")
                .items(stringSchema)
                .build();

        Schema responseSchema = Schema.builder()
                .type("OBJECT")
                .properties(
                        Map.of(
                                "score", integerSchema,
                                "summary", stringSchema,
                                "correctness", stringSchema,
                                "timeComplexity", stringSchema,
                                "spaceComplexity", stringSchema,
                                "strengths", strengthsSchema,
                                "improvements", improvementsSchema
                        )
                )
                .required(List.of(
                        "score",
                        "summary",
                        "correctness",
                        "timeComplexity",
                        "spaceComplexity",
                        "strengths",
                        "improvements"
                ))
                .build();

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .responseMimeType("application/json")
                        .responseSchema(responseSchema)
                        .build();

        GenerateContentResponse response = callGeminiWithFallback(prompt, config);

        return jsonMapper.readValue(
                response.text(),
                GeminiReviewResponse.class
        );
    }

    public String generateInterviewQuestion(String topic) {

        String prompt = """
            Act as a technical interviewer.

            Generate one coding interview question for the topic:
            %s

            The question should be appropriate for a college student
            preparing for product-based company interviews.

            Return only the interview question.
            """.formatted(topic);

        try {
            GenerateContentResponse response = callGeminiWithFallback(prompt, null);
            return response.text();
        } catch (Exception e) {
            log.error("Failed to generate interview question: {}", e.getMessage());
            return "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may not use the same element twice.";
        }
    }

    public GeminiInterviewEvaluationResponse evaluateInterviewAnswer(
            String question,
            String answer
    ) throws Exception {

        String prompt = """
            Act as a senior technical interviewer.

            Interview Question:
            %s

            Candidate Answer:
            %s

            Evaluate the candidate's answer.

            Give a score from 0 to 100.

            Evaluate:
            - Understanding of the problem
            - Quality of the proposed approach
            - Technical correctness
            - Communication
            - Edge cases
            - Complexity awareness

            Provide concise but useful feedback.

            Return the result as structured JSON.
            """.formatted(question, answer);

        Schema stringSchema = Schema.builder()
                .type("STRING")
                .build();

        Schema integerSchema = Schema.builder()
                .type("INTEGER")
                .build();

        Schema strengthsSchema = Schema.builder()
                .type("ARRAY")
                .items(stringSchema)
                .build();

        Schema improvementsSchema = Schema.builder()
                .type("ARRAY")
                .items(stringSchema)
                .build();

        Schema responseSchema = Schema.builder()
                .type("OBJECT")
                .properties(
                        Map.of(
                                "score", integerSchema,
                                "feedback", stringSchema,
                                "strengths", strengthsSchema,
                                "improvements", improvementsSchema
                        )
                )
                .required(List.of(
                        "score",
                        "feedback",
                        "strengths",
                        "improvements"
                ))
                .build();

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .responseMimeType("application/json")
                        .responseSchema(responseSchema)
                        .build();

        GenerateContentResponse response = callGeminiWithFallback(prompt, config);

        return jsonMapper.readValue(
                response.text(),
                GeminiInterviewEvaluationResponse.class
        );
    }
}
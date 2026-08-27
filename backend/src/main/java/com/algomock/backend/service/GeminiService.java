package com.algomock.backend.service;

import com.algomock.backend.dto.GeminiReviewResponse;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tools.jackson.databind.json.JsonMapper;
import com.google.genai.types.GenerateContentResponse;
import com.algomock.backend.dto.GeminiInterviewEvaluationResponse;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final Client client;
    private final JsonMapper jsonMapper;
    private final String modelName;

    public GeminiService(
            @Value("${app.gemini.api-key}") String apiKey,
            @Value("${app.gemini.model:gemini-3.5-flash-lite}") String modelName,
            JsonMapper jsonMapper
    ) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.modelName = modelName;
        this.jsonMapper = jsonMapper;
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

        GenerateContentResponse response =
                client.models.generateContent(
                        this.modelName,
                        prompt,
                        config
                );

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

        GenerateContentResponse response =
                client.models.generateContent(
                        this.modelName,
                        prompt,
                        null
                );

        return response.text();
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

        GenerateContentResponse response =
                client.models.generateContent(
                        this.modelName,
                        prompt,
                        config
                );

        return jsonMapper.readValue(
                response.text(),
                GeminiInterviewEvaluationResponse.class
        );
    }
}
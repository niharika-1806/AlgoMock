import { useState } from "react";
import { Link } from "react-router-dom";

import "./MockInterviewPage.css";

function MockInterviewPage() {

    const [topic, setTopic] = useState("");
    const [interview, setInterview] = useState(null);
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function startInterview() {

        setError("");
        setInterview(null);
        setAnswer("");

        if (!topic.trim()) {
            setError("Please select or enter a topic.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("You are not logged in.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/interviews",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        topic: topic
                    })
                }
            );

            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");

                setError("Your session has expired. Please log in again.");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to start interview: ${response.status}`
                );
            }

            const data = await response.json();

            setInterview(data);

        } catch (error) {

            console.error("Start interview error:", error);

            setError("Unable to start the interview.");

        } finally {

            setLoading(false);
        }
    }


    async function submitAnswer() {

        setError("");

        if (!answer.trim()) {
            setError("Please enter your answer.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("You are not logged in.");
            return;
        }

        try {

            setSubmitting(true);

            const response = await fetch(
                `http://localhost:8080/api/interviews/${interview.id}/answer`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        answer: answer
                    })
                }
            );

            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");

                setError("Your session has expired. Please log in again.");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to submit answer: ${response.status}`
                );
            }

            const data = await response.json();

            setInterview(data);

        } catch (error) {

            console.error("Submit answer error:", error);

            setError("Unable to submit your answer.");

        } finally {

            setSubmitting(false);
        }
    }


    return (
        <div className="mock-interview-page">

            <div className="mock-interview-container">

                <Link
                    to="/dashboard"
                    className="back-dashboard"
                >
                    ← Back to Dashboard
                </Link>


                <div className="mock-header">

                    <h1>Mock Interview</h1>

                    <p>
                        Practice like you're in a real technical interview.
                    </p>

                </div>


                {!interview && (

                    <div className="topic-panel">

                        <h2>Choose a Topic</h2>

                        <select
                            value={topic}
                            onChange={(event) =>
                                setTopic(event.target.value)
                            }
                        >

                            <option value="">
                                Select a topic
                            </option>

                            <option value="Arrays">
                                Arrays
                            </option>

                            <option value="Strings">
                                Strings
                            </option>

                            <option value="Linked Lists">
                                Linked Lists
                            </option>

                            <option value="Trees">
                                Trees
                            </option>

                            <option value="Graphs">
                                Graphs
                            </option>

                            <option value="Dynamic Programming">
                                Dynamic Programming
                            </option>

                        </select>


                        <button
                            className="interview-button"
                            onClick={startInterview}
                            disabled={loading}
                        >
                            {loading
                                ? "Generating Question..."
                                : "Start Mock Interview"
                            }
                        </button>

                    </div>

                )}


                {interview && interview.score === 0 && (

                    <div className="question-panel">

                        <div className="question-header">

                            <span>
                                {interview.topic}
                            </span>

                            <span>
                                Interview Question
                            </span>

                        </div>

                        <h2>
                            Your Question
                        </h2>

                        <div className="question-content">
                            {interview.question}
                        </div>


                        <label>
                            Your Answer
                        </label>

                        <textarea
                            value={answer}
                            onChange={(event) =>
                                setAnswer(event.target.value)
                            }
                            placeholder="Explain your approach as if you were answering a technical interviewer..."
                        />


                        {error && (
                            <div className="interview-error">
                                {error}
                            </div>
                        )}


                        <button
                            className="interview-button"
                            onClick={submitAnswer}
                            disabled={submitting}
                        >
                            {submitting
                                ? "Evaluating Your Answer..."
                                : "Submit Answer"
                            }
                        </button>

                    </div>

                )}


                {interview && interview.score > 0 && (

                    <div className="interview-result">

                        <div className="result-header">

                            <div>

                                <span className="result-label">
                                    AI INTERVIEW FEEDBACK
                                </span>

                                <h2>
                                    Interview Evaluation
                                </h2>

                            </div>

                            <div className="interview-score">

                                <span>
                                    {interview.score}
                                </span>

                                <small>
                                    /100
                                </small>

                            </div>

                        </div>


                        <section className="result-section">

                            <h3>Question</h3>

                            <p>
                                {interview.question}
                            </p>

                        </section>


                        <section className="result-section">

                            <h3>Your Answer</h3>

                            <p>
                                {interview.answer}
                            </p>

                        </section>


                        <section className="result-section">

                            <h3>Feedback</h3>

                            <p>
                                {interview.feedback}
                            </p>

                        </section>


                        <div className="feedback-grid">

                            <div className="feedback-card">

                                <h3>✓ Strengths</h3>

                                <ul>
                                    {interview.strengths?.map(
                                        (strength, index) => (
                                            <li key={index}>
                                                {strength}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>


                            <div className="feedback-card improvement-card">

                                <h3>⚡ Improvements</h3>

                                <ul>
                                    {interview.improvements?.map(
                                        (improvement, index) => (
                                            <li key={index}>
                                                {improvement}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>

                        </div>


                        <button
                            className="interview-button"
                            onClick={() => {
                                setInterview(null);
                                setAnswer("");
                                setTopic("");
                            }}
                        >
                            Start Another Interview
                        </button>

                    </div>

                )}


                {error && !interview && (
                    <div className="interview-error">
                        {error}
                    </div>
                )}

            </div>

        </div>
    );
}

export default MockInterviewPage;
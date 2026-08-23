import { useState } from "react";
import { Link } from "react-router-dom";
import "./ReviewPage.css";

function ReviewPage() {

    const [problem, setProblem] = useState("");
    const [code, setCode] = useState("");

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleReview() {

        setError("");
        setReview(null);

        if (!problem.trim()) {
            setError("Please enter the coding problem.");
            return;
        }

        if (!code.trim()) {
            setError("Please enter your code.");
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
                "http://localhost:8080/api/reviews",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        problem: problem,
                        code: code
                    })
                }
            );

            if (!response.ok) {

                if (response.status === 401) {
                    setError("Your session has expired. Please log in again.");
                } else {
                    setError("Failed to review your code.");
                }

                return;
            }

            const data = await response.json();

            setReview(data);

        } catch (error) {

            console.error("Review error:", error);
            setError("Unable to connect to the server.");

        } finally {

            setLoading(false);
        }
    }

    return (
        <div className="review-page">

            <div className="review-container">

                <Link to="/dashboard" className="back-dashboard">
                    ← Back to Dashboard
                </Link>

                <div className="review-header">

                    <h1>Review My Code</h1>

                    <p>
                        Get AI-powered feedback from a virtual technical interviewer.
                    </p>

                </div>

                <div className="review-input-grid">

                    <div className="review-panel">

                        <label htmlFor="problem">
                            Coding Problem
                        </label>

                        <textarea
                            id="problem"
                            value={problem}
                            onChange={(event) =>
                                setProblem(event.target.value)
                            }
                            placeholder="Paste the coding problem here..."
                        />

                    </div>

                    <div className="review-panel">

                        <label htmlFor="code">
                            Your Code
                        </label>

                        <textarea
                            id="code"
                            value={code}
                            onChange={(event) =>
                                setCode(event.target.value)
                            }
                            placeholder="Paste your solution here..."
                        />

                    </div>

                </div>

                {error && (
                    <div className="review-error">
                        {error}
                    </div>
                )}

                <button
                    className="review-button"
                    onClick={handleReview}
                    disabled={loading}
                >
                    {loading ? "Analyzing Your Code..." : "Review My Code"}
                </button>

                {review && (
                    <div className="review-result">

                        <div className="result-header">
                            <div>
                                <span className="result-label">
                                    AI Code Review
                                </span>

                                <h2>Interview Feedback</h2>
                            </div>

                            <div className="score-circle">
                                <span>{review.score}</span>
                                <small>/100</small>
                            </div>
                        </div>

                        <div className="review-section">
                            <h3>Summary</h3>
                            <p>{review.summary}</p>
                        </div>

                        <div className="review-section">
                            <h3>Correctness</h3>
                            <p>{review.correctness}</p>
                        </div>

                        <div className="complexity-grid">

                            <div className="complexity-card">
                                <span>Time Complexity</span>
                                <strong>
                                    {review.timeComplexity}
                                </strong>
                            </div>

                            <div className="complexity-card">
                                <span>Space Complexity</span>
                                <strong>
                                    {review.spaceComplexity}
                                </strong>
                            </div>

                        </div>

                        <div className="feedback-grid">

                            <div className="feedback-card">
                                <h3>✓ Strengths</h3>

                                <ul>
                                    {review.strengths?.map(
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
                                    {review.improvements?.map(
                                        (improvement, index) => (
                                            <li key={index}>
                                                {improvement}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default ReviewPage;
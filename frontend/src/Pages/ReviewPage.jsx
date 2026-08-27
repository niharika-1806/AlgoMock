import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Code2, ArrowLeft, Loader2, CheckCircle2, Zap, AlertTriangle, Clock, Layers } from "lucide-react";
import "./ReviewPage.css";
import { apiFetch } from "../utils/api";

function ReviewPage() {

    const [problem, setProblem] = useState("");
    const [code, setCode] = useState("");

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Review My Code • AlgoMock";
    }, []);

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

        try {
            setLoading(true);

            const response = await apiFetch(
                "/api/reviews",
                {
                    method: "POST",
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
                    const errorMsg = await response.text();
                    setError(errorMsg || "Failed to review your code.");
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

                <Link to="/dashboard" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="review-hero-header">
                    <div className="review-badge">
                        <Sparkles size={13} />
                        <span>AI Static & Dynamic Evaluator</span>
                    </div>
                    <h1>Review My Code</h1>
                    <p>
                        Get actionable Big-O algorithmic complexity diagnostics and detailed feedback from an AI technical interviewer.
                    </p>
                </div>

                <div className="review-input-grid">

                    {/* Problem Panel */}
                    <div className="editor-panel">
                        <div className="panel-header">
                            <span className="panel-title">1. Coding Problem Statement</span>
                        </div>

                        <textarea
                            id="problem"
                            value={problem}
                            onChange={(event) => setProblem(event.target.value)}
                            placeholder="Paste the problem description, constraints, and sample testcases here..."
                            disabled={loading}
                        />
                    </div>

                    {/* Code Panel */}
                    <div className="editor-panel">
                        <div className="panel-header">
                            <div className="panel-dots">
                                <span className="pdot red"></span>
                                <span className="pdot yellow"></span>
                                <span className="pdot green"></span>
                            </div>
                            <span className="panel-title code-title">2. Your Solution</span>
                        </div>

                        <textarea
                            id="code"
                            className="code-textarea"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            placeholder="// Paste your Java, Python, C++, or JS solution here..."
                            disabled={loading}
                        />
                    </div>

                </div>

                {error && (
                    <div className="review-error-banner">
                        <AlertTriangle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="action-button-container">
                    <button
                        className="review-submit-button"
                        onClick={handleReview}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="btn-spinner" />
                                <span>Evaluating Algorithmic Complexity...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                <span>Run AI Code Evaluation</span>
                            </>
                        )}
                    </button>
                </div>

                {review && (
                    <div className="review-result-card">

                        <div className="result-header">
                            <div>
                                <div className="result-badge">
                                    <Sparkles size={13} />
                                    <span>AI Code Review Result</span>
                                </div>
                                <h2>Evaluation Breakdown</h2>
                            </div>

                            <div className="score-luxury-badge">
                                <div className="score-number">{review.score}</div>
                                <div className="score-out-of">/ 100</div>
                            </div>
                        </div>

                        <div className="review-section summary-box">
                            <h3>Executive Summary</h3>
                            <p>{review.summary}</p>
                        </div>

                        <div className="review-section correctness-box">
                            <h3>Correctness Analysis</h3>
                            <p>{review.correctness}</p>
                        </div>

                        <div className="complexity-grid">
                            <div className="complexity-card">
                                <div className="complexity-icon-wrap">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <span className="complexity-label">Time Complexity</span>
                                    <strong className="complexity-value">{review.timeComplexity}</strong>
                                </div>
                            </div>

                            <div className="complexity-card">
                                <div className="complexity-icon-wrap space-wrap">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <span className="complexity-label">Space Complexity</span>
                                    <strong className="complexity-value">{review.spaceComplexity}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="feedback-grid">
                            <div className="feedback-card strengths-card">
                                <div className="card-header-with-icon">
                                    <CheckCircle2 size={20} className="strength-icon" />
                                    <h3>Identified Strengths</h3>
                                </div>

                                <ul>
                                    {review.strengths?.map((strength, index) => (
                                        <li key={index}>{strength}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="feedback-card improvement-card">
                                <div className="card-header-with-icon">
                                    <Zap size={20} className="improvement-icon" />
                                    <h3>Optimization Recommendations</h3>
                                </div>

                                <ul>
                                    {review.improvements?.map((improvement, index) => (
                                        <li key={index}>{improvement}</li>
                                    ))}
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
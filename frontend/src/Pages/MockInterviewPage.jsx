import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Sparkles, Send, Loader2, CheckCircle2, Zap, RotateCcw, AlertTriangle, Layers } from "lucide-react";
import "./MockInterviewPage.css";
import { apiFetch } from "../utils/api";

function MockInterviewPage() {

    const [topic, setTopic] = useState("");
    const [interview, setInterview] = useState(null);
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Mock Interview • AlgoMock";
    }, []);

    const predefinedTopics = [
        "Arrays & Two Pointers",
        "Strings & Hashing",
        "Linked Lists",
        "Trees & Binary Search",
        "Graphs & BFS/DFS",
        "Dynamic Programming"
    ];

    async function startInterview(selectedTopic) {
        const topicToUse = selectedTopic || topic;

        setError("");
        setInterview(null);
        setAnswer("");

        if (!topicToUse.trim()) {
            setError("Please select or enter a topic.");
            return;
        }

        try {
            setLoading(true);

            const response = await apiFetch(
                "/api/interviews",
                {
                    method: "POST",
                    body: JSON.stringify({
                        topic: topicToUse
                    })
                }
            );

            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg || `Failed to start interview: ${response.status}`);
            }

            const data = await response.json();
            setInterview(data);

        } catch (error) {
            console.error("Start interview error:", error);

            if (error.message === "Session expired.") {
                return;
            }

            setError(error.message || "Unable to start the interview. Please try again.");
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

        if (!interview) {
            setError("No active interview found.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await apiFetch(
                `/api/interviews/${interview.id}/answer`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        answer: answer
                    })
                }
            );

            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg || `Failed to submit answer: ${response.status}`);
            }

            const data = await response.json();
            setInterview(data);

        } catch (error) {
            console.error("Submit answer error:", error);

            if (error.message === "Session expired.") {
                return;
            }

            setError(error.message || "Unable to submit your answer. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    function startAnotherInterview() {
        setInterview(null);
        setAnswer("");
        setTopic("");
        setError("");
    }

    return (
        <div className="mock-interview-page">
            <div className="mock-interview-container">

                <Link to="/dashboard" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="mock-hero-header">
                    <div className="mock-badge">
                        <Mic size={13} />
                        <span>AI Technical Interview Simulator</span>
                    </div>
                    <h1>Live Mock Interview</h1>
                    <p>
                        Simulate rigorous technical interview rounds, explain your thought process, and receive actionable grading from an AI interviewer.
                    </p>
                </div>

                {/* ================= TOPIC SELECTION ================= */}
                {!interview && (
                    <div className="topic-selection-card">
                        <div className="topic-card-header">
                            <span className="step-tag">Step 1</span>
                            <h2>Select Interview Domain</h2>
                            <p>Choose an algorithmic domain to generate a custom interview challenge.</p>
                        </div>

                        <div className="topic-chips-grid">
                            {predefinedTopics.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`topic-chip ${topic === t ? "active" : ""}`}
                                    onClick={() => setTopic(t)}
                                    disabled={loading}
                                >
                                    <Layers size={16} className="chip-icon" />
                                    <span>{t}</span>
                                </button>
                            ))}
                        </div>

                        <div className="custom-topic-wrapper">
                            <label htmlFor="custom-topic-select">Or choose from standard list:</label>
                            <select
                                id="custom-topic-select"
                                value={topic}
                                onChange={(event) => setTopic(event.target.value)}
                                disabled={loading}
                            >
                                <option value="">Select a topic</option>
                                <option value="Arrays">Arrays</option>
                                <option value="Strings">Strings</option>
                                <option value="Linked Lists">Linked Lists</option>
                                <option value="Trees">Trees</option>
                                <option value="Graphs">Graphs</option>
                                <option value="Dynamic Programming">Dynamic Programming</option>
                            </select>
                        </div>

                        {error && (
                            <div className="mock-error-banner">
                                <AlertTriangle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            className="start-interview-btn"
                            onClick={() => startInterview(topic)}
                            disabled={loading || !topic}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="btn-spinner" />
                                    <span>Synthesizing Interview Question...</span>
                                </>
                            ) : (
                                <>
                                    <Mic size={18} />
                                    <span>Begin Technical Interview</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* ================= QUESTION ================= */}
                {interview && interview.score === 0 && (
                    <div className="interview-active-card">
                        <div className="interview-card-meta">
                            <div className="domain-pill">
                                <Layers size={14} />
                                <span>{interview.topic}</span>
                            </div>
                            <div className="live-status-badge">
                                <span className="pulse-dot"></span>
                                <span>Round in Progress</span>
                            </div>
                        </div>

                        <div className="question-box">
                            <h3 className="question-heading">Interviewer Prompt:</h3>
                            <p className="question-text">{interview.question}</p>
                        </div>

                        <div className="answer-section">
                            <label htmlFor="interview-answer">
                                Your Solution & Architectural Explanation:
                            </label>

                            <textarea
                                id="interview-answer"
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                placeholder="Walk through your approach: mention data structures chosen, Big-O trade-offs, handling edge cases, and code outline..."
                                disabled={submitting}
                            />
                        </div>

                        {error && (
                            <div className="mock-error-banner">
                                <AlertTriangle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            className="submit-answer-btn"
                            onClick={submitAnswer}
                            disabled={submitting || !answer.trim()}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={18} className="btn-spinner" />
                                    <span>Evaluating Technical Response...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>Submit Final Response</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* ================= RESULT ================= */}
                {interview && interview.score > 0 && (
                    <div className="interview-evaluation-card">
                        <div className="eval-header">
                            <div>
                                <div className="eval-badge">
                                    <Sparkles size={13} />
                                    <span>Interview Round Evaluation</span>
                                </div>
                                <h2>Assessment & Scoring</h2>
                            </div>

                            <div className="eval-score-circle">
                                <span className="score-number">{interview.score}</span>
                                <small className="score-denom">/100</small>
                            </div>
                        </div>

                        <div className="eval-section prompt-review">
                            <h4>Original Question ({interview.topic})</h4>
                            <p>{interview.question}</p>
                        </div>

                        <div className="eval-section candidate-answer-review">
                            <h4>Your Submitted Response</h4>
                            <p>{interview.answer}</p>
                        </div>

                        <div className="eval-section interviewer-feedback-box">
                            <h4>Interviewer Critique</h4>
                            <p>{interview.feedback}</p>
                        </div>

                        <div className="feedback-columns-grid">
                            <div className="feedback-col strengths-col">
                                <div className="col-title-wrap">
                                    <CheckCircle2 size={20} className="icon-green" />
                                    <h3>Strengths</h3>
                                </div>

                                {interview.strengths?.length > 0 ? (
                                    <ul>
                                        {interview.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-feedback-text">No specific strengths documented.</p>
                                )}
                            </div>

                            <div className="feedback-col improvements-col">
                                <div className="col-title-wrap">
                                    <Zap size={20} className="icon-amber" />
                                    <h3>Recommendations for Improvement</h3>
                                </div>

                                {interview.improvements?.length > 0 ? (
                                    <ul>
                                        {interview.improvements.map((improvement, index) => (
                                            <li key={index}>{improvement}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-feedback-text">No specific improvements suggested.</p>
                                )}
                            </div>
                        </div>

                        <div className="another-interview-container">
                            <button
                                className="another-interview-btn"
                                onClick={startAnotherInterview}
                            >
                                <RotateCcw size={16} />
                                <span>Start Another Interview</span>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default MockInterviewPage;
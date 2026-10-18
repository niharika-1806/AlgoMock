import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles, CheckCircle2, Zap, Layers, AlertTriangle, UserCheck } from "lucide-react";
import "./MockInterviewDetailsPage.css";
import { apiFetch } from "../utils/api";

function MockInterviewDetailsPage() {

    const { id } = useParams();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Interview Evaluation • AlgoMock";

        async function fetchInterview() {
            try {
                const response = await apiFetch(`/api/interviews/${id}`);

                if (response.status === 404) {
                    setError("Interview session not found.");
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to load interview: ${response.status}`);
                }

                const data = await response.json();
                setInterview(data);

            } catch (error) {
                console.error("Interview details error:", error);

                if (error.message === "Session expired.") {
                    return;
                }

                setError("Unable to load this interview session.");
            } finally {
                setLoading(false);
            }
        }

        fetchInterview();
    }, [id]);

    if (loading) {
        return (
            <div className="mock-details-loading">
                <div className="luxury-spinner"></div>
                <h2>Loading Interview Session...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mock-details-page">
                <div className="mock-details-container">
                    <Link to="/mock-interview-history" className="back-link">
                        <ArrowLeft size={16} />
                        <span>Back to Interview History</span>
                    </Link>

                    <div className="mock-details-error-banner">
                        <AlertTriangle size={18} />
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!interview) {
        return null;
    }

    return (
        <div className="mock-details-page">
            <div className="mock-details-container">

                <Link to="/mock-interview-history" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Interview History</span>
                </Link>

                {/* Header */}
                <div className="mock-details-hero-card">
                    <div>
                        <div className="mock-details-badge">
                            <Sparkles size={13} />
                            <span>Interview Evaluation Report</span>
                        </div>
                        <div className="topic-tag">
                            <Layers size={15} />
                            <span>{interview.topic}</span>
                        </div>
                        <h1 className="mock-session-heading">Technical Interview Evaluation</h1>
                        <span className="interview-datetime">
                            <Clock size={13} />
                            Interviewed on {new Date(interview.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div className="mock-details-score-box">
                        <span className="score-number">{interview.score}</span>
                        <small className="score-denom">/100</small>
                    </div>
                </div>

                {/* Question */}
                <section className="mock-eval-block question-block">
                    <h3>Interviewer Question</h3>
                    <div className="question-text-box">
                        {interview.question}
                    </div>
                </section>

                {/* Answer */}
                <section className="mock-eval-block answer-block">
                    <div className="block-title-with-icon">
                        <UserCheck size={18} className="user-icon" />
                        <h3>Your Technical Response</h3>
                    </div>
                    <div className="candidate-answer-box">
                        {interview.answer}
                    </div>
                </section>

                {/* Feedback */}
                <section className="mock-eval-block feedback-block">
                    <h3>Interviewer Summary & Critique</h3>
                    <p className="interviewer-critique-text">
                        {interview.feedback}
                    </p>
                </section>

                {/* Strengths + Improvements */}
                <div className="mock-feedback-columns-grid">
                    <section className="feedback-col strengths-col">
                        <div className="col-heading-wrap">
                            <CheckCircle2 size={20} className="icon-green" />
                            <h3>Strengths Demonstrated</h3>
                        </div>

                        {interview.strengths?.length > 0 ? (
                            <ul>
                                {interview.strengths.map((strength, index) => (
                                    <li key={index}>{strength}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state-notice">No strengths provided.</p>
                        )}
                    </section>

                    <section className="feedback-col improvements-col">
                        <div className="col-heading-wrap">
                            <Zap size={20} className="icon-amber" />
                            <h3>Areas for Optimization</h3>
                        </div>

                        {interview.improvements?.length > 0 ? (
                            <ul>
                                {interview.improvements.map((improvement, index) => (
                                    <li key={index}>{improvement}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state-notice">No improvements provided.</p>
                        )}
                    </section>
                </div>

            </div>
        </div>
    );
}

export default MockInterviewDetailsPage;
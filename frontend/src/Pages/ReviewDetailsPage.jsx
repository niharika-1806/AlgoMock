import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Code2, Sparkles, CheckCircle2, Zap, Layers, AlertTriangle } from "lucide-react";
import "./ReviewDetailsPage.css";
import { apiFetch } from "../utils/api";

function ReviewDetailsPage() {

    const { id } = useParams();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Review Details • AlgoMock";

        async function fetchReview() {
            try {
                const response = await apiFetch(`/api/reviews/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Review not found.");
                        return;
                    }
                    throw new Error(`Failed to load review: ${response.status}`);
                }

                const data = await response.json();
                setReview(data);

            } catch (error) {
                console.error("Review details error:", error);
                setError("Unable to load this review.");
            } finally {
                setLoading(false);
            }
        }

        fetchReview();
    }, [id]);

    if (loading) {
        return (
            <div className="details-loading-screen">
                <div className="luxury-spinner"></div>
                <h2>Loading Review Details...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="review-details-page">
                <div className="review-details-container">
                    <Link to="/review-history" className="back-link">
                        <ArrowLeft size={16} />
                        <span>Back to Review History</span>
                    </Link>

                    <div className="details-error-banner">
                        <AlertTriangle size={18} />
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!review) {
        return null;
    }

    return (
        <div className="review-details-page">
            <div className="review-details-container">

                <Link to="/review-history" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Review History</span>
                </Link>

                {/* Header */}
                <div className="details-hero-card">
                    <div>
                        <div className="details-badge">
                            <Sparkles size={13} />
                            <span>AI Code Evaluation Record</span>
                        </div>
                        <h1 className="details-title">{review.problem}</h1>
                        <span className="details-timestamp">
                            <Clock size={13} />
                            Evaluated on {new Date(review.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div className="details-score-box">
                        <span className="score-main">{review.score}</span>
                        <small className="score-denom">/100</small>
                    </div>
                </div>

                {/* Summary & Correctness */}
                <div className="details-narrative-grid">
                    <section className="details-block summary-block">
                        <h3>Executive Summary</h3>
                        <p>{review.summary}</p>
                    </section>

                    <section className="details-block correctness-block">
                        <h3>Correctness & Edge-Cases</h3>
                        <p>{review.correctness}</p>
                    </section>
                </div>

                {/* Complexity Analysis */}
                <section className="details-complexity-section">
                    <h3>Complexity Diagnostics</h3>
                    <div className="details-complexity-grid">
                        <div className="complexity-item">
                            <div className="c-icon-wrap">
                                <Clock size={20} />
                            </div>
                            <div>
                                <span className="c-label">Time Complexity</span>
                                <strong className="c-val">{review.timeComplexity}</strong>
                            </div>
                        </div>

                        <div className="complexity-item">
                            <div className="c-icon-wrap space-wrap">
                                <Layers size={20} />
                            </div>
                            <div>
                                <span className="c-label">Space Complexity</span>
                                <strong className="c-val">{review.spaceComplexity}</strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Strengths + Improvements */}
                <div className="details-feedback-row">
                    <section className="feedback-column strengths-column">
                        <div className="column-header">
                            <CheckCircle2 size={20} className="col-icon col-green" />
                            <h3>Strengths</h3>
                        </div>

                        {review.strengths?.length > 0 ? (
                            <ul>
                                {review.strengths.map((strength, index) => (
                                    <li key={index}>{strength}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state-text">No strengths recorded.</p>
                        )}
                    </section>

                    <section className="feedback-column improvements-column">
                        <div className="column-header">
                            <Zap size={20} className="col-icon col-amber" />
                            <h3>Areas for Optimization</h3>
                        </div>

                        {review.improvements?.length > 0 ? (
                            <ul>
                                {review.improvements.map((improvement, index) => (
                                    <li key={index}>{improvement}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state-text">No improvements suggested.</p>
                        )}
                    </section>
                </div>

                {/* Submitted Code Terminal */}
                <section className="submitted-code-terminal">
                    <div className="terminal-top">
                        <div className="terminal-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <span className="terminal-title">
                            <Code2 size={14} />
                            <span>Submitted Solution Code</span>
                        </span>
                    </div>

                    <pre className="terminal-code-body">
                        <code>{review.code}</code>
                    </pre>
                </section>

            </div>
        </div>
    );
}

export default ReviewDetailsPage;
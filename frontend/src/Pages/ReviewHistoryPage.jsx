import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Code2, ArrowRight, Sparkles, Layers, FileCode2 } from "lucide-react";
import "./ReviewHistoryPage.css";
import { apiFetch } from "../utils/api";

function ReviewHistoryPage() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Review History • AlgoMock";

        async function fetchReviews() {
            try {
                const response = await apiFetch("/api/reviews");

                if (!response.ok) {
                    throw new Error(`Failed to load review history: ${response.status}`);
                }

                const data = await response.json();
                setReviews(data);

            } catch (error) {
                console.error("History error:", error);
                setError("Unable to load review history.");
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="history-loading-screen">
                <div className="luxury-spinner"></div>
                <h2>Loading Review History...</h2>
                <p>Retrieving your past submissions and AI scores.</p>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="history-container">

                <Link to="/dashboard" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="history-hero-header">
                    <div className="history-badge">
                        <Sparkles size={13} />
                        <span>Submissions Log</span>
                    </div>
                    <h1>Code Review History</h1>
                    <p>
                        Track and review all previous AI-powered algorithmic evaluations and performance ratings.
                    </p>
                </div>

                {error && (
                    <div className="history-error-card">
                        {error}
                    </div>
                )}

                {!error && reviews.length === 0 && (
                    <div className="empty-history-card">
                        <div className="empty-icon-wrap">
                            <FileCode2 size={36} />
                        </div>
                        <h2>No Reviews Yet</h2>
                        <p>Submit your first coding solution to receive deep algorithmic insights and Big-O diagnostics.</p>
                        <Link to="/review" className="start-review-cta">
                            <Code2 size={18} />
                            <span>Start First Code Review</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}

                {!error && reviews.length > 0 && (
                    <div className="history-cards-grid">
                        {reviews.map((review) => (
                            <div className="history-item-card" key={review.id}>
                                <div className="history-item-top">
                                    <div className="history-item-title-group">
                                        <h3 className="history-problem-name">{review.problem}</h3>
                                        <span className="history-timestamp">
                                            <Clock size={13} />
                                            {new Date(review.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className="history-score-chip">
                                        <span className="score-num">{review.score}</span>
                                        <span className="score-denom">/100</span>
                                    </div>
                                </div>

                                <p className="history-summary-text">{review.summary}</p>

                                <div className="history-metrics-row">
                                    <div className="metric-pill">
                                        <Clock size={13} className="pill-icon" />
                                        <span>Time: <strong>{review.timeComplexity}</strong></span>
                                    </div>
                                    <div className="metric-pill">
                                        <Layers size={13} className="pill-icon" />
                                        <span>Space: <strong>{review.spaceComplexity}</strong></span>
                                    </div>
                                </div>

                                <div className="history-item-footer">
                                    <Link
                                        to={`/review-history/${review.id}`}
                                        className="view-details-action"
                                    >
                                        <span>View Full Analysis</span>
                                        <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default ReviewHistoryPage;
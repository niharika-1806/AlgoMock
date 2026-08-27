import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Sparkles, Clock, ArrowRight, Layers } from "lucide-react";
import "./MockInterviewHistoryPage.css";
import { apiFetch } from "../utils/api";

function MockInterviewHistoryPage() {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Mock Interview History • AlgoMock";

        async function fetchInterviewHistory() {
            try {
                const response = await apiFetch("/api/interviews");

                if (!response.ok) {
                    throw new Error(`Failed to load interview history: ${response.status}`);
                }

                const data = await response.json();
                setInterviews(data);

            } catch (error) {
                console.error("Interview history error:", error);

                if (error.message === "Session expired.") {
                    return;
                }

                setError("Unable to load interview history.");
            } finally {
                setLoading(false);
            }
        }

        fetchInterviewHistory();
    }, []);

    if (loading) {
        return (
            <div className="history-loading-screen">
                <div className="luxury-spinner"></div>
                <h2>Loading Interview History...</h2>
                <p>Retrieving your recorded mock sessions and interviewer ratings.</p>
            </div>
        );
    }

    return (
        <div className="mock-history-page">
            <div className="mock-history-container">

                <Link to="/dashboard" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="mock-history-hero-header">
                    <div className="mock-history-badge">
                        <Sparkles size={13} />
                        <span>Interview Log</span>
                    </div>
                    <h1>Mock Interview History</h1>
                    <p>
                        Review your past technical interview performances, scores, and interviewer feedback.
                    </p>
                </div>

                {error && (
                    <div className="mock-history-error-card">
                        {error}
                    </div>
                )}

                {!error && interviews.length === 0 && (
                    <div className="empty-mock-history-card">
                        <div className="empty-icon-wrap">
                            <Mic size={36} />
                        </div>
                        <h2>No Interviews Yet</h2>
                        <p>Begin your first AI mock interview to practice answering technical questions under interview conditions.</p>
                        <Link to="/mock-interview" className="start-interview-cta">
                            <Mic size={18} />
                            <span>Start First Mock Interview</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}

                {!error && interviews.length > 0 && (
                    <div className="mock-history-cards-grid">
                        {interviews.map((interview) => (
                            <div className="mock-history-item-card" key={interview.id}>
                                <div className="mock-item-top">
                                    <div>
                                        <div className="topic-pill">
                                            <Layers size={13} />
                                            <span>{interview.topic}</span>
                                        </div>
                                        <h3 className="mock-session-title">Live Interview Session</h3>
                                        <span className="mock-timestamp">
                                            <Clock size={13} />
                                            {new Date(interview.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className="mock-score-badge">
                                        <span className="score-num">{interview.score}</span>
                                        <span className="score-denom">/100</span>
                                    </div>
                                </div>

                                <p className="mock-feedback-snippet">
                                    {interview.feedback || "Evaluation completed."}
                                </p>

                                <div className="mock-item-footer">
                                    <Link
                                        to={`/mock-interview/${interview.id}`}
                                        className="view-interview-action"
                                    >
                                        <span>View Evaluation & Answer</span>
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

export default MockInterviewHistoryPage;
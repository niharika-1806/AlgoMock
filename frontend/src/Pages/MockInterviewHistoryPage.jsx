import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MockInterviewHistoryPage.css";
import { apiFetch } from "../utils/api";

function MockInterviewHistoryPage() {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchInterviewHistory() {

            try {

                const response = await apiFetch(
                    "/api/interviews"
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to load interview history: ${response.status}`
                    );
                }

                const data = await response.json();

                setInterviews(data);

            } catch (error) {

                console.error(
                    "Interview history error:",
                    error
                );

                if (error.message === "Session expired.") {
                    return;
                }

                setError(
                    "Unable to load interview history."
                );

            } finally {

                setLoading(false);
            }
        }

        fetchInterviewHistory();

    }, []);


    if (loading) {

        return (
            <div className="mock-history-loading">
                <h1>Loading Interview History...</h1>
            </div>
        );

    }


    return (
        <div className="mock-history-page">

            <div className="mock-history-container">

                <Link
                    to="/dashboard"
                    className="back-dashboard"
                >
                    ← Back to Dashboard
                </Link>


                <div className="mock-history-header">

                    <h1>Mock Interview History</h1>

                    <p>
                        Review your previous AI interview performances.
                    </p>

                </div>


                {error && (
                    <div className="mock-history-error">
                        {error}
                    </div>
                )}


                {!error && interviews.length === 0 && (

                    <div className="empty-mock-history">

                        <h2>No interviews yet</h2>

                        <p>
                            Start your first mock interview to see
                            your results here.
                        </p>

                        <Link
                            to="/mock-interview"
                            className="start-interview-link"
                        >
                            Start Mock Interview
                        </Link>

                    </div>

                )}


                {!error && interviews.length > 0 && (

                    <div className="mock-history-grid">

                        {interviews.map((interview) => (

                            <div
                                className="mock-history-card"
                                key={interview.id}
                            >

                                <div className="mock-card-top">

                                    <div>

                                        <span className="topic-label">
                                            {interview.topic}
                                        </span>

                                        <h2>
                                            Mock Interview
                                        </h2>

                                        <span className="interview-date">
                                            {new Date(
                                                interview.createdAt
                                            ).toLocaleString()}
                                        </span>

                                    </div>


                                    <div className="mock-score">

                                        {interview.score}

                                        <small>
                                            /100
                                        </small>

                                    </div>

                                </div>


                                <p className="mock-feedback-preview">
                                    {interview.feedback}
                                </p>


                                <div className="mock-history-actions">

                                    <Link
                                        to={`/mock-interview/${interview.id}`}
                                        className="view-interview-link"
                                    >
                                        View Full Interview →
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
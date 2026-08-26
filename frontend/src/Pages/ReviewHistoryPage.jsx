import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ReviewHistoryPage.css";
import { apiFetch } from "../utils/api";


function ReviewHistoryPage() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

       async function fetchReviews() {

    try {

        const response = await apiFetch("/api/reviews");

        if (!response.ok) {
            throw new Error(
                `Failed to load review history: ${response.status}`
            );
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
            <div className="history-loading">
                <h1>Loading Review History...</h1>
            </div>
        );
    }

    return (
        <div className="history-page">

            <div className="history-container">

                <Link
                    to="/dashboard"
                    className="back-dashboard"
                >
                    ← Back to Dashboard
                </Link>

                <div className="history-header">
                    <h1>Review History</h1>

                    <p>
                        Review your previous AI-powered coding evaluations.
                    </p>
                </div>

                {error && (
                    <div className="history-error">
                        {error}
                    </div>
                )}

                {!error && reviews.length === 0 && (
                    <div className="empty-history">
                        <h2>No reviews yet</h2>

                        <p>
                            Submit your first solution to get AI feedback.
                        </p>

                        <Link
                            to="/review"
                            className="start-review-link"
                        >
                            Start a Review
                        </Link>
                    </div>
                )}

                {!error && reviews.length > 0 && (
                    <div className="history-grid">

                        {reviews.map((review) => (

                            <div
                                className="history-card"
                                key={review.id}
                            >

                                <div className="history-card-top">

                                    <div>
                                        <h2>
                                            {review.problem}
                                        </h2>

                                        <span>
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="history-score">
                                        {review.score}
                                        <small>/100</small>
                                    </div>

                                </div>

                                <p className="history-summary">
                                    {review.summary}
                                </p>

                                <div className="history-complexity">

                                    <div>
                                        <span>Time</span>
                                        <strong>
                                            {review.timeComplexity}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Space</span>
                                        <strong>
                                            {review.spaceComplexity}
                                        </strong>
                                    </div>

                                </div>
                                <Link
    to={`/review-history/${review.id}`}
    className="view-review-link"
>
    View Full Review →
</Link>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ReviewHistoryPage;
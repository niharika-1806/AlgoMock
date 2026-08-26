import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ReviewDetailsPage.css";
import { apiFetch } from "../utils/api";

function ReviewDetailsPage() {

    const { id } = useParams();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchReview() {

            try {
                
                const response = await apiFetch(
        `/api/reviews/${id}`
    );
if (!response.ok) {

        if (response.status === 404) {
            setError("Review not found.");
            return;
        }

        throw new Error(
            `Failed to load review: ${response.status}`
        );
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
            <div className="review-details-loading">
                <h1>Loading Review...</h1>
            </div>
        );
    }


    if (error) {
        return (
            <div className="review-details-page">

                <div className="review-details-container">

                    <Link
                        to="/review-history"
                        className="back-history"
                    >
                        ← Back to Review History
                    </Link>

                    <div className="review-details-error">
                        <h1>{error}</h1>
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

                <Link
                    to="/review-history"
                    className="back-history"
                >
                    ← Back to Review History
                </Link>


                {/* Header */}

                <div className="review-details-header">

                    <div>

                        <span className="details-label">
                            AI CODE REVIEW
                        </span>

                        <h1>
                            {review.problem}
                        </h1>

                    </div>

                    <div className="details-score">

                        <span>
                            {review.score}
                        </span>

                        <small>
                            /100
                        </small>

                    </div>

                </div>


                {/* Summary */}

                <section className="details-section">

                    <h2>Summary</h2>

                    <p>
                        {review.summary}
                    </p>

                </section>


                {/* Correctness */}

                <section className="details-section">

                    <h2>Correctness</h2>

                    <p>
                        {review.correctness}
                    </p>

                </section>


                {/* Complexity */}

                <section className="details-section">

                    <h2>Complexity Analysis</h2>

                    <div className="details-complexity">

                        <div className="complexity-box">

                            <span>
                                Time Complexity
                            </span>

                            <strong>
                                {review.timeComplexity}
                            </strong>

                        </div>

                        <div className="complexity-box">

                            <span>
                                Space Complexity
                            </span>

                            <strong>
                                {review.spaceComplexity}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* Strengths + Improvements */}

                <div className="details-feedback-grid">

                    <section className="details-card">

                        <h2>✓ Strengths</h2>

                        {review.strengths?.length > 0 ? (

                            <ul>
                                {review.strengths.map(
                                    (strength, index) => (
                                        <li key={index}>
                                            {strength}
                                        </li>
                                    )
                                )}
                            </ul>

                        ) : (
                            <p>No strengths provided.</p>
                        )}

                    </section>


                    <section className="details-card improvement-card">

                        <h2>⚡ Improvements</h2>

                        {review.improvements?.length > 0 ? (

                            <ul>
                                {review.improvements.map(
                                    (improvement, index) => (
                                        <li key={index}>
                                            {improvement}
                                        </li>
                                    )
                                )}
                            </ul>

                        ) : (
                            <p>No improvements provided.</p>
                        )}

                    </section>

                </div>


                {/* Submitted Code */}

                <section className="code-section">

                    <h2>Your Submitted Code</h2>

                    <pre>
                        <code>
                            {review.code}
                        </code>
                    </pre>

                </section>


                {/* Date */}

                <div className="review-date">

                    Reviewed on{" "}
                    {new Date(
                        review.createdAt
                    ).toLocaleString()}

                </div>

            </div>

        </div>
    );
}

export default ReviewDetailsPage;
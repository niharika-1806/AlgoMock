import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./MockInterviewDetailsPage.css";
import { apiFetch } from "../utils/api";

function MockInterviewDetailsPage() {

    const { id } = useParams();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchInterview() {

            try {

                const response = await apiFetch(
                    `/api/interviews/${id}`
                );

                if (response.status === 404) {
                    setError("Interview not found.");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        `Failed to load interview: ${response.status}`
                    );
                }

                const data = await response.json();

                setInterview(data);

            } catch (error) {

                console.error(
                    "Interview details error:",
                    error
                );

                if (error.message === "Session expired.") {
                    return;
                }

                setError(
                    "Unable to load this interview."
                );

            } finally {

                setLoading(false);
            }
        }

        fetchInterview();

    }, [id]);


    if (loading) {

        return (
            <div className="mock-details-loading">
                <h1>Loading Interview...</h1>
            </div>
        );

    }


    if (error) {

        return (
            <div className="mock-details-page">

                <div className="mock-details-container">

                    <Link
                        to="/mock-interview-history"
                        className="back-mock-history"
                    >
                        ← Back to Interview History
                    </Link>

                    <div className="mock-details-error">
                        <h1>{error}</h1>
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

                <Link
                    to="/mock-interview-history"
                    className="back-mock-history"
                >
                    ← Back to Interview History
                </Link>


                {/* Header */}

                <div className="mock-details-header">

                    <div>

                        <span className="mock-details-label">
                            AI MOCK INTERVIEW
                        </span>

                        <h1>
                            {interview.topic}
                        </h1>

                    </div>


                    <div className="mock-details-score">

                        <span>
                            {interview.score}
                        </span>

                        <small>
                            /100
                        </small>

                    </div>

                </div>


                {/* Question */}

                <section className="mock-details-section">

                    <h2>Interview Question</h2>

                    <div className="mock-question">
                        {interview.question}
                    </div>

                </section>


                {/* Answer */}

                <section className="mock-details-section">

                    <h2>Your Answer</h2>

                    <div className="mock-answer">
                        {interview.answer}
                    </div>

                </section>


                {/* Feedback */}

                <section className="mock-details-section">

                    <h2>Interviewer Feedback</h2>

                    <p>
                        {interview.feedback}
                    </p>

                </section>


                {/* Strengths + Improvements */}

                <div className="mock-feedback-grid">

                    <section className="mock-feedback-card">

                        <h2>✓ Strengths</h2>

                        {interview.strengths?.length > 0 ? (

                            <ul>
                                {interview.strengths.map(
                                    (strength, index) => (
                                        <li key={index}>
                                            {strength}
                                        </li>
                                    )
                                )}
                            </ul>

                        ) : (

                            <p>
                                No strengths provided.
                            </p>

                        )}

                    </section>


                    <section className="mock-feedback-card mock-improvement-card">

                        <h2>⚡ Improvements</h2>

                        {interview.improvements?.length > 0 ? (

                            <ul>
                                {interview.improvements.map(
                                    (improvement, index) => (
                                        <li key={index}>
                                            {improvement}
                                        </li>
                                    )
                                )}
                            </ul>

                        ) : (

                            <p>
                                No improvements provided.
                            </p>

                        )}

                    </section>

                </div>


                <div className="mock-interview-date">

                    Interviewed on{" "}
                    {new Date(
                        interview.createdAt
                    ).toLocaleString()}

                </div>

            </div>

        </div>
    );
}

export default MockInterviewDetailsPage;
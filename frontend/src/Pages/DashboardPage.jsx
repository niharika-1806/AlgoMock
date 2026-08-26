import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./DashboardPage.css";

import StatCard from "../components/StatCard/StatCard";
import Button from "../components/Buttons/Buttons";
import features from "../data/features";

import { apiFetch } from "../utils/api";

function Dashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchDashboard() {

            try {

                setLoading(true);
                setError("");

                const response = await apiFetch(
                    "/api/dashboard"
                );

                if (!response.ok) {

                    throw new Error(
                        `Dashboard request failed: ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("Dashboard Data:", data);

                setDashboardData(data);

            } catch (error) {

                console.error(
                    "Error fetching dashboard:",
                    error
                );

                if (error.message === "Session expired.") {
                    return;
                }

                setError(
                    "Unable to load dashboard. Please try again."
                );

            } finally {

                setLoading(false);

            }
        }

        fetchDashboard();

    }, []);


    // Page title
    useEffect(() => {

        document.title = "AlgoMock Dashboard";

    }, []);


    // Logout
   function handleLogout() {

    localStorage.removeItem("token");

    window.dispatchEvent(
        new Event("authChange")
    );

    navigate("/login");
}


    // Loading state
    if (loading) {

        return (
            <div className="loading-screen">

                <h1>
                    Loading Dashboard...
                </h1>

            </div>
        );
    }


    // Error state
    if (error) {

        return (
            <div className="loading-screen">

                <h1>
                    {error}
                </h1>

                <Button
                    variant="primary"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>

            </div>
        );
    }


    // Safety check
    if (!dashboardData) {

        return (
            <div className="loading-screen">

                <h1>
                    No dashboard data available.
                </h1>

            </div>
        );
    }


    return (
        <div className="dashboard">

            {/* ================= HEADER ================= */}

            <div className="dashboard-header">

                <div className="header-left">

                    <h1>
                        👋 Welcome back, {dashboardData.userName}
                    </h1>

                    <p>
                        Continue your interview preparation today.
                    </p>

                </div>


                <Button
                    variant="primary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </div>


            {/* ================= QUICK STATS ================= */}

            <section className="stats-section">

                <h2>
                    Quick Stats
                </h2>

                <div className="stats-grid">

                    {dashboardData.stats.map((stat) => (

                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                        />

                    ))}

                </div>

            </section>


            {/* ================= MAIN FEATURES ================= */}

            <section className="features-section">

                <h2>
                    Main Features
                </h2>

                <div className="features-grid">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="feature-card"
                            >

                                <h3>

                                    <Icon size={24} />

                                    {feature.title}

                                </h3>

                                <p>
                                    {feature.description}
                                </p>

                                <Button
                                    onClick={() => {

                                        if (
                                            feature.title ===
                                            "Review My Code"
                                        ) {

                                            navigate("/review");

                                        }

                                        if (
                                            feature.title ===
                                            "Mock Interview"
                                        ) {

                                            navigate("/mock-interview");

                                        }

                                    }}
                                >
                                    {feature.button}
                                </Button>

                            </div>

                        );

                    })}

                </div>


                {/* ================= HISTORY ACTIONS ================= */}

                <div className="history-actions">

                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate("/review-history")
                        }
                    >
                        View Review History
                    </Button>


                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate("/mock-interview-history")
                        }
                    >
                        View Interview History
                    </Button>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;
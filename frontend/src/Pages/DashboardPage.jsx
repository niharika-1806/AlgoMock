import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./DashboardPage.css";

import StatCard from "../components/StatCard/StatCard";
import Button from "../components/Buttons/Buttons";
import features from "../data/features";

function Dashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        // No token → send user to login
        if (!token) {
            navigate("/login");
            return;
        }

        async function fetchDashboard() {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:8080/api/dashboard",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                // Token expired / invalid
                if (response.status === 401) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("loggedIn");

                    navigate("/login");
                    return;
                }

                // Any other HTTP error
                if (!response.ok) {

                    throw new Error(
                        `Dashboard request failed: ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("Dashboard Data:", data);

                setDashboardData(data);

            } catch (error) {

                console.error("Error fetching dashboard:", error);

                setError(
                    "Unable to load dashboard. Please try again."
                );

            } finally {

                // Always stop loading
                setLoading(false);

            }
        }

        fetchDashboard();

    }, [navigate]);


    // Page title
    useEffect(() => {

        document.title = "AlgoMock Dashboard";

    }, []);


    // Logout
    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");

        navigate("/login");
    }


    // Loading state
    if (loading) {

        return (
            <div className="loading-screen">
                <h1>Loading Dashboard...</h1>
            </div>
        );

    }


    // Error state
    if (error) {

        return (
            <div className="loading-screen">
                <h1>{error}</h1>

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
                <h1>No dashboard data available.</h1>
            </div>
        );

    }


    return (
        <div className="dashboard">

            {/* ================= HEADER ================= */}

            <div className="dashboard-header">

                <div className="header-left">

                    <h1>
                        👋 Welcome back, Niharika
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

                <h2>Quick Stats</h2>

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

                <h2>Main Features</h2>

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

                                    }}
                                >
                                    {feature.button}
                                </Button>

                            </div>

                        );

                    })}

                </div>

            </section>


            {/* ================= RECENT ACTIVITY ================= */}

            <section className="activity-section">

                <h2>Recent Activity</h2>

                <div className="activity-list">

                    {dashboardData.activities.map((activity) => (

                        <div
                            className="activity-item"
                            key={activity.text}
                        >

                            <span>
                                {activity.text}
                            </span>

                            <small>
                                {activity.time}
                            </small>

                        </div>

                    ))}

                </div>

            </section>


            {/* ================= TODAY'S GOAL ================= */}

            <section className="goal-section">

                <h2>Today's Goal</h2>

                <div className="goal-card">

                    <div className="goal-header">

                        <h3>
                            {dashboardData.goal.title}
                        </h3>

                        <span>
                            {dashboardData.goal.progress}
                        </span>

                    </div>

                    <p className="goal-description">
                        {dashboardData.goal.description}
                    </p>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    dashboardData.goal.progress
                            }}
                        ></div>

                    </div>

                    <Button variant="primary">
                        Continue Solving
                    </Button>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;
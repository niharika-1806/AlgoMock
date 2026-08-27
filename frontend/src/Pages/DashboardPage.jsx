import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, LogOut, Target, Clock, ArrowRight, History, Zap, CheckCircle2, RotateCw, Shield } from "lucide-react";
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

                const response = await apiFetch("/api/dashboard");

                if (!response.ok) {
                    throw new Error(`Dashboard request failed: ${response.status}`);
                }

                const data = await response.json();
                console.log("Dashboard Data:", data);
                setDashboardData(data);

            } catch (error) {
                console.error("Error fetching dashboard:", error);

                if (error.message === "Session expired.") {
                    return;
                }

                setError("Unable to load dashboard. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    // Page title
    useEffect(() => {
        document.title = "Dashboard • AlgoMock";
    }, []);

    // Logout
    function handleLogout() {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
    }

    // Loading state
    if (loading) {
        return (
            <div className="dashboard-loading-state">
                <div className="luxury-spinner"></div>
                <h2>Loading Your Workspace...</h2>
                <p>Gathering your performance analytics and interview history.</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="dashboard-error-state">
                <div className="error-icon-box">!</div>
                <h2>Unable to Load Workspace</h2>
                <p>{error}</p>
                <button
                    className="retry-btn"
                    onClick={() => window.location.reload()}
                >
                    <RotateCw size={16} />
                    <span>Try Again</span>
                </button>
            </div>
        );
    }

    // Safety check
    if (!dashboardData) {
        return (
            <div className="dashboard-error-state">
                <h2>No Dashboard Data Available</h2>
                <button
                    className="retry-btn"
                    onClick={() => window.location.reload()}
                >
                    <RotateCw size={16} />
                    <span>Reload Page</span>
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">

                {/* ================= HEADER ================= */}
                <div className="dashboard-hero-header">
                    <div className="header-left">
                        <div className="welcome-badge">
                            <span className="live-dot"></span>
                            <span>Preparation Workspace</span>
                        </div>
                        <h1>Welcome back{dashboardData.userName ? `, ${dashboardData.userName}` : ""} 👋</h1>
                        <p>Track your technical progress, refine code quality, and simulate live interviews.</p>
                    </div>

                    <div className="header-right-actions">
                        {dashboardData.userRole === "ADMIN" && (
                            <Link
                                to="/admin"
                                className="dashboard-admin-btn"
                                title="Open Platform Admin Portal"
                            >
                                <Shield size={16} />
                                <span>Admin Portal</span>
                            </Link>
                        )}

                        <button
                            className="dashboard-logout-btn"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* ================= QUICK STATS ================= */}
                <section className="stats-section">
                    <div className="section-header">
                        <h2>Performance Overview</h2>
                        <span className="section-tag">Live Metrics</span>
                    </div>

                    <div className="stats-grid">
                        {dashboardData.stats?.map((stat) => (
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
                    <div className="section-header">
                        <h2>Practice Workspaces</h2>
                        <span className="section-tag">Core Tools</span>
                    </div>

                    <div className="features-grid">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="feature-action-card"
                                >
                                    <div className="feature-card-glow"></div>
                                    <div className="feature-card-content">
                                        <div className="feature-card-top">
                                            <div className="feature-icon-badge">
                                                <Icon size={24} />
                                            </div>
                                            <span className="feature-pill">AI Powered</span>
                                        </div>

                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>

                                        <button
                                            className="feature-launch-btn"
                                            onClick={() => {
                                                if (feature.title === "Review My Code") {
                                                    navigate("/review");
                                                }
                                                if (feature.title === "Mock Interview") {
                                                    navigate("/mock-interview");
                                                }
                                            }}
                                        >
                                            <span>{feature.button}</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ================= LEARNING GOAL (IF PRESENT) ================= */}
                {dashboardData.goal && (
                    <section className="goal-section">
                        <div className="goal-card">
                            <div className="goal-header">
                                <div className="goal-title-wrap">
                                    <Target size={22} className="goal-icon" />
                                    <div>
                                        <h3>{dashboardData.goal.title || "Target Goal"}</h3>
                                        <p className="goal-description">{dashboardData.goal.description}</p>
                                    </div>
                                </div>
                                <span className="goal-badge">{dashboardData.goal.progress || "In Progress"}</span>
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= RECENT ACTIVITIES (IF PRESENT) ================= */}
                {dashboardData.activities && dashboardData.activities.length > 0 && (
                    <section className="activity-section">
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                            <span className="section-tag">Log</span>
                        </div>

                        <div className="activity-list">
                            {dashboardData.activities.map((activity, idx) => (
                                <div key={idx} className="activity-item">
                                    <div className="activity-left">
                                        <div className="activity-dot"></div>
                                        <span className="activity-text">{activity.text}</span>
                                    </div>
                                    <span className="activity-time">
                                        <Clock size={13} />
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= HISTORY SHORTCUTS ================= */}
                <div className="history-actions-banner">
                    <div className="history-banner-text">
                        <History size={20} className="banner-icon" />
                        <div>
                            <h4>Archives & Historical Evaluations</h4>
                            <p>Access your complete history of past code reviews and mock interviews.</p>
                        </div>
                    </div>

                    <div className="history-btn-group">
                        <button
                            className="history-nav-btn"
                            onClick={() => navigate("/review-history")}
                        >
                            <span>Review History</span>
                            <ArrowRight size={15} />
                        </button>

                        <button
                            className="history-nav-btn"
                            onClick={() => navigate("/mock-interview-history")}
                        >
                            <span>Interview History</span>
                            <ArrowRight size={15} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
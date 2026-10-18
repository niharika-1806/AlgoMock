import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Users,
    Code2,
    MessageSquare,
    TrendingUp,
    CheckCircle2,
    Search,
    Shield,
    ArrowLeft,
    RotateCw,
    Sparkles,
    Calendar,
    Flame,
    X,
    FileCode,
    Cpu,
    Award,
    Clock,
    ChevronRight,
    Filter,
    BarChart3,
    Activity as ActivityIcon,
    Lock,
    LogOut,
    ShieldAlert
} from "lucide-react";
import { apiFetch } from "../utils/api";
import "./AdminPage.css";

function AdminPage() {

    const navigate = useNavigate();

    // Stats and Data state
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [recentInterviews, setRecentInterviews] = useState([]);

    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isForbidden, setIsForbidden] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [activeTab, setActiveTab] = useState("users"); // "users" | "reviews" | "interviews"

    // Modal state for user drill-down
    const [selectedUser, setSelectedUser] = useState(null);
    const [userHistoryLoading, setUserHistoryLoading] = useState(false);
    const [userHistoryData, setUserHistoryData] = useState(null);
    const [modalTab, setModalTab] = useState("reviews"); // "reviews" | "interviews"

    useEffect(() => {
        document.title = "Admin Portal • AlgoMock";
        loadAdminData();
    }, []);

    async function loadAdminData() {
        try {
            setLoading(true);
            setError("");
            setIsForbidden(false);

            // Check current user profile
            const meRes = await apiFetch("/api/auth/me");
            if (meRes.ok) {
                const meData = await meRes.json();
                setCurrentUser(meData);
                if (meData.role !== "ADMIN") {
                    setIsForbidden(true);
                    setLoading(false);
                    return;
                }
            }

            const [statsRes, usersRes, reviewsRes, interviewsRes] = await Promise.all([
                apiFetch("/api/admin/stats"),
                apiFetch("/api/admin/users"),
                apiFetch("/api/admin/reviews"),
                apiFetch("/api/admin/interviews")
            ]);

            if (statsRes.status === 401 || usersRes.status === 401) {
                navigate("/login");
                return;
            }

            if (statsRes.status === 403 || usersRes.status === 403) {
                setIsForbidden(true);
                return;
            }

            if (!statsRes.ok || !usersRes.ok) {
                throw new Error("Failed to fetch admin data.");
            }

            const statsData = await statsRes.json();
            const usersData = await usersRes.json();
            const reviewsData = reviewsRes.ok ? await reviewsRes.json() : [];
            const interviewsData = interviewsRes.ok ? await interviewsRes.json() : [];

            setStats(statsData);
            setUsers(usersData);
            setRecentReviews(reviewsData);
            setRecentInterviews(interviewsData);

        } catch (err) {
            console.error("Admin portal load error:", err);
            setError("Unable to load platform analytics. Please verify backend connectivity.");
        } finally {
            setLoading(false);
        }
    }

    async function handleViewUserDetails(userId) {
        try {
            setUserHistoryLoading(true);
            setSelectedUser(users.find((u) => u.id === userId) || { id: userId });
            setModalTab("reviews");

            const res = await apiFetch(`/api/admin/users/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUserHistoryData(data);
                if (data.user) {
                    setSelectedUser(data.user);
                }
            } else {
                throw new Error("Failed to load user details");
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
        } finally {
            setUserHistoryLoading(false);
        }
    }

    function closeModal() {
        setSelectedUser(null);
        setUserHistoryData(null);
    }

    // Filter users by search term and role
    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole =
            roleFilter === "ALL" ||
            (roleFilter === "ADMIN" && u.role === "ADMIN") ||
            (roleFilter === "USER" && u.role !== "ADMIN");

        return matchesSearch && matchesRole;
    });

    if (loading) {
        return (
            <div className="admin-loading-screen">
                <div className="luxury-spinner"></div>
                <h2>Loading Admin Analytics...</h2>
                <p>Aggregating user telemetry, code reviews, and mock interview statistics.</p>
            </div>
        );
    }

    if (isForbidden) {
        return (
            <div className="admin-forbidden-page">
                <div className="admin-forbidden-card">
                    <div className="forbidden-icon-circle">
                        <ShieldAlert size={36} />
                    </div>
                    <div className="forbidden-badge">
                        <Lock size={13} />
                        <span>Restricted Area</span>
                    </div>
                    <h2>Access Denied: Administrator Only</h2>
                    <p>
                        This portal contains sensitive platform telemetry, user databases, and system metrics accessible exclusively to authorized administrators.
                    </p>
                    {currentUser && (
                        <div className="forbidden-user-box">
                            <span>Currently logged in as:</span>
                            <strong>{currentUser.email} ({currentUser.role || "USER"})</strong>
                        </div>
                    )}
                    <div className="forbidden-actions">
                        <Link to="/dashboard" className="forbidden-return-btn">
                            <ArrowLeft size={16} />
                            <span>Return to Dashboard</span>
                        </Link>
                        <button
                            className="forbidden-switch-btn"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.dispatchEvent(new Event("authChange"));
                                navigate("/login");
                            }}
                        >
                            <LogOut size={16} />
                            <span>Sign in with Admin Credentials</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-container">

                {/* Header */}
                <div className="admin-header-row">
                    <div>
                        <Link to="/dashboard" className="admin-back-link">
                            <ArrowLeft size={16} />
                            <span>Return to Dashboard</span>
                        </Link>

                        <div className="admin-title-wrap">
                            <div className="admin-badge">
                                <Shield size={14} />
                                <span>Platform Control Center</span>
                            </div>
                            <h1>Admin Analytics & Insights</h1>
                            <p className="admin-subtitle">
                                Monitor real-time platform engagement, review registered user profiles, and inspect submission histories.
                            </p>
                        </div>
                    </div>

                    <button className="admin-refresh-btn" onClick={loadAdminData} title="Refresh Telemetry">
                        <RotateCw size={16} />
                        <span>Refresh Data</span>
                    </button>
                </div>

                {error && (
                    <div className="admin-error-banner">
                        <span>{error}</span>
                    </div>
                )}

                {/* Top Analytics Metrics */}
                {stats && (
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap blue">
                                <Users size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Total Users</span>
                                <span className="stat-value">{stats.totalUsers}</span>
                                <span className="stat-meta">Registered accounts</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap purple">
                                <FileCode size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Code Reviews</span>
                                <span className="stat-value">{stats.totalCodeReviews}</span>
                                <span className="stat-meta">AI evaluated submissions</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap cyan">
                                <MessageSquare size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Mock Interviews</span>
                                <span className="stat-value">{stats.totalMockInterviews}</span>
                                <span className="stat-meta">Simulations conducted</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap green">
                                <Award size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Avg Review Score</span>
                                <span className="stat-value">
                                    {stats.averageCodeReviewScore > 0 ? `${stats.averageCodeReviewScore}%` : "N/A"}
                                </span>
                                <span className="stat-meta">Overall code score</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap amber">
                                <TrendingUp size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Avg Interview Score</span>
                                <span className="stat-value">
                                    {stats.averageMockInterviewScore > 0 ? `${stats.averageMockInterviewScore}%` : "N/A"}
                                </span>
                                <span className="stat-meta">Overall mock score</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon-wrap rose">
                                <CheckCircle2 size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">Problems Solved</span>
                                <span className="stat-value">{stats.totalProblemsSolved}</span>
                                <span className="stat-meta">Platform-wide total</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Navigation Tabs */}
                <div className="admin-nav-tabs">
                    <button
                        className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
                        onClick={() => setActiveTab("users")}
                    >
                        <Users size={16} />
                        <span>User Management ({users.length})</span>
                    </button>

                    <button
                        className={`admin-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        <FileCode size={16} />
                        <span>Recent Code Reviews ({recentReviews.length})</span>
                    </button>

                    <button
                        className={`admin-tab-btn ${activeTab === "interviews" ? "active" : ""}`}
                        onClick={() => setActiveTab("interviews")}
                    >
                        <MessageSquare size={16} />
                        <span>Recent Mock Interviews ({recentInterviews.length})</span>
                    </button>
                </div>

                {/* TAB 1: USERS LIST */}
                {activeTab === "users" && (
                    <div className="admin-section-card">

                        {/* Search & Filter Bar */}
                        <div className="table-controls-row">
                            <div className="table-search-box">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="table-filter-group">
                                <Filter size={16} />
                                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                                    <option value="ALL">All Roles</option>
                                    <option value="USER">Candidates (Users)</option>
                                    <option value="ADMIN">Administrators</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User Details</th>
                                        <th>Role</th>
                                        <th>Daily Streak</th>
                                        <th>Code Reviews</th>
                                        <th>Mock Interviews</th>
                                        <th>Avg Review</th>
                                        <th>Avg Interview</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="empty-table-cell">
                                                No users matching your search criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="user-primary-cell">
                                                        <div className="user-avatar-circle">
                                                            {(user.name || user.email).charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="user-table-name">{user.name || "Anonymous User"}</div>
                                                            <div className="user-table-email">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`role-badge ${user.role === "ADMIN" ? "admin" : "user"}`}>
                                                        {user.role === "ADMIN" ? "Admin" : "Candidate"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="streak-table-cell">
                                                        <Flame size={15} className="flame-icon" />
                                                        <span>{user.dailyStreak || 0}d</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="count-pill">{user.codeReviewsCount || 0}</span>
                                                </td>
                                                <td>
                                                    <span className="count-pill">{user.mockInterviewsCount || 0}</span>
                                                </td>
                                                <td>
                                                    <span className="score-text">
                                                        {user.avgReviewScore ? `${user.avgReviewScore}%` : "—"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="score-text">
                                                        {user.avgInterviewScore ? `${user.avgInterviewScore}%` : "—"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="view-user-btn"
                                                        onClick={() => handleViewUserDetails(user.id)}
                                                    >
                                                        <span>View Details</span>
                                                        <ChevronRight size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}

                {/* TAB 2: RECENT REVIEWS */}
                {activeTab === "reviews" && (
                    <div className="admin-section-card">
                        <div className="section-header-inline">
                            <h2>Recent Code Reviews System-Wide</h2>
                            <span className="section-subtext">Detailed breakdown of AI evaluations</span>
                        </div>

                        {recentReviews.length === 0 ? (
                            <div className="admin-empty-state">
                                <FileCode size={36} />
                                <p>No code reviews recorded yet.</p>
                            </div>
                        ) : (
                            <div className="admin-feed-list">
                                {recentReviews.map((rev) => (
                                    <div key={rev.id} className="admin-feed-item">
                                        <div className="feed-item-header">
                                            <div className="feed-title-block">
                                                <span className="feed-id-tag">Review #{rev.id}</span>
                                                <h3 className="feed-problem-title">{rev.problem || "Coding Exercise"}</h3>
                                            </div>
                                            <div className="feed-score-badge">
                                                <span>Score: {rev.score}/100</span>
                                            </div>
                                        </div>

                                        <p className="feed-summary-text">{rev.summary || "No summary provided."}</p>

                                        <div className="feed-meta-chips">
                                            {rev.timeComplexity && (
                                                <span className="meta-chip">
                                                    <Clock size={12} /> Time: {rev.timeComplexity}
                                                </span>
                                            )}
                                            {rev.spaceComplexity && (
                                                <span className="meta-chip">
                                                    <Cpu size={12} /> Space: {rev.spaceComplexity}
                                                </span>
                                            )}
                                            {rev.createdAt && (
                                                <span className="meta-chip date">
                                                    <Calendar size={12} /> {new Date(rev.createdAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: RECENT INTERVIEWS */}
                {activeTab === "interviews" && (
                    <div className="admin-section-card">
                        <div className="section-header-inline">
                            <h2>Recent Mock Interviews System-Wide</h2>
                            <span className="section-subtext">Candidate questions, answers, and AI interviewer scoring</span>
                        </div>

                        {recentInterviews.length === 0 ? (
                            <div className="admin-empty-state">
                                <MessageSquare size={36} />
                                <p>No mock interviews recorded yet.</p>
                            </div>
                        ) : (
                            <div className="admin-feed-list">
                                {recentInterviews.map((item) => (
                                    <div key={item.id} className="admin-feed-item">
                                        <div className="feed-item-header">
                                            <div className="feed-title-block">
                                                <span className="feed-id-tag">Interview #{item.id}</span>
                                                <h3 className="feed-problem-title">{item.topic || "Technical Interview"}</h3>
                                            </div>
                                            <div className="feed-score-badge">
                                                <span>Score: {item.score}/100</span>
                                            </div>
                                        </div>

                                        <div className="interview-qa-preview">
                                            <div className="qa-block">
                                                <strong>Question:</strong> {item.question}
                                            </div>
                                            {item.answer && (
                                                <div className="qa-block answer">
                                                    <strong>Answer:</strong> {item.answer}
                                                </div>
                                            )}
                                        </div>

                                        {item.feedback && (
                                            <p className="feed-summary-text">
                                                <strong>Feedback:</strong> {item.feedback}
                                            </p>
                                        )}

                                        <div className="feed-meta-chips">
                                            {item.createdAt && (
                                                <span className="meta-chip date">
                                                    <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* USER DRILL-DOWN MODAL */}
            {selectedUser && (
                <div className="admin-modal-overlay" onClick={closeModal}>
                    <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>

                        <div className="admin-modal-header">
                            <div className="modal-user-identity">
                                <div className="modal-avatar">
                                    {(selectedUser.name || selectedUser.email).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2>{selectedUser.name || "User Details"}</h2>
                                    <p className="modal-user-email">{selectedUser.email}</p>
                                </div>
                            </div>

                            <button className="modal-close-btn" onClick={closeModal}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal User Stat Bar */}
                        <div className="modal-user-summary-bar">
                            <div className="modal-stat-box">
                                <span className="modal-stat-num">{selectedUser.dailyStreak || 0}d</span>
                                <span className="modal-stat-txt">Streak</span>
                            </div>
                            <div className="modal-stat-box">
                                <span className="modal-stat-num">{selectedUser.problemsSolved || 0}</span>
                                <span className="modal-stat-txt">Solved</span>
                            </div>
                            <div className="modal-stat-box">
                                <span className="modal-stat-num">{selectedUser.codeReviewsCount || (userHistoryData?.reviews?.length || 0)}</span>
                                <span className="modal-stat-txt">Reviews</span>
                            </div>
                            <div className="modal-stat-box">
                                <span className="modal-stat-num">{selectedUser.mockInterviewsCount || (userHistoryData?.interviews?.length || 0)}</span>
                                <span className="modal-stat-txt">Interviews</span>
                            </div>
                        </div>

                        {/* Modal Navigation Tabs */}
                        <div className="modal-tabs-row">
                            <button
                                className={`modal-tab-btn ${modalTab === "reviews" ? "active" : ""}`}
                                onClick={() => setModalTab("reviews")}
                            >
                                <FileCode size={15} />
                                <span>Code Reviews ({userHistoryData?.reviews?.length || 0})</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${modalTab === "interviews" ? "active" : ""}`}
                                onClick={() => setModalTab("interviews")}
                            >
                                <MessageSquare size={15} />
                                <span>Mock Interviews ({userHistoryData?.interviews?.length || 0})</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body-scroll">
                            {userHistoryLoading ? (
                                <div className="modal-loading-block">
                                    <div className="luxury-spinner mini"></div>
                                    <p>Loading candidate history...</p>
                                </div>
                            ) : modalTab === "reviews" ? (
                                userHistoryData?.reviews?.length === 0 ? (
                                    <div className="modal-empty-msg">No code reviews submitted by this user yet.</div>
                                ) : (
                                    <div className="modal-history-list">
                                        {userHistoryData?.reviews?.map((rev) => (
                                            <div key={rev.id} className="modal-history-card">
                                                <div className="history-card-top">
                                                    <h4>{rev.problem || "Coding Challenge"}</h4>
                                                    <span className="history-score-tag">{rev.score}/100</span>
                                                </div>

                                                <p className="history-summary">{rev.summary}</p>

                                                {rev.code && (
                                                    <details className="history-code-fold">
                                                        <summary>View Candidate Submitted Code</summary>
                                                        <pre><code>{rev.code}</code></pre>
                                                    </details>
                                                )}

                                                <div className="history-details-meta">
                                                    {rev.timeComplexity && <span>⏱ Time: {rev.timeComplexity}</span>}
                                                    {rev.spaceComplexity && <span>💾 Space: {rev.spaceComplexity}</span>}
                                                    {rev.createdAt && <span>📅 {new Date(rev.createdAt).toLocaleString()}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                userHistoryData?.interviews?.length === 0 ? (
                                    <div className="modal-empty-msg">No mock interviews completed by this user yet.</div>
                                ) : (
                                    <div className="modal-history-list">
                                        {userHistoryData?.interviews?.map((item) => (
                                            <div key={item.id} className="modal-history-card">
                                                <div className="history-card-top">
                                                    <h4>Topic: {item.topic}</h4>
                                                    <span className="history-score-tag">{item.score}/100</span>
                                                </div>

                                                <div className="modal-qa-entry">
                                                    <strong>Q:</strong> {item.question}
                                                </div>

                                                {item.answer && (
                                                    <div className="modal-qa-entry answer">
                                                        <strong>Candidate:</strong> {item.answer}
                                                    </div>
                                                )}

                                                {item.feedback && (
                                                    <div className="modal-feedback-entry">
                                                        <strong>AI Feedback:</strong> {item.feedback}
                                                    </div>
                                                )}

                                                <div className="history-details-meta">
                                                    {item.createdAt && <span>📅 {new Date(item.createdAt).toLocaleString()}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminPage;

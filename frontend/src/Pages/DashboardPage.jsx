import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import StatCard from "../components/StatCard/StatCard";
import Button from "../components/Buttons/Buttons";
import features from "../data/features";
import activities from "../data/activities";
import goal from "../data/goals";
import {
    Code2,
    Mic,
    BookOpen,
    User
} from "lucide-react";

function Dashboard() {
    const navigate = useNavigate();
    // creating a loading state
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {

            if (!response.ok) {
                throw new Error(`Dashboard request failed: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {

            console.log("Dashboard Data:", data);
            setDashboardData(data);

        })
        .catch((error) => {

            console.error("Error fetching dashboard:", error);

        });

}, []);
    useEffect(() => {

    const timer = setTimeout(() => {

        setLoading(false);

    }, 2000);

    // means when this component(dashboard) is removed, execute this function to stop the timer, otherwise react will try to update something that no longer exists

    return () => clearTimeout(timer);

    }, []);
    // The empty array tells React: "Run this effect only once when the component mounts."
    useEffect(() => {

    document.title = "AlgoMock Dashboard";
    }, []);

    function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
     navigate("/login");
}

if (loading) {
    return (
        <div className="loading-screen">
            <h1>Loading Dashboard...</h1>
        </div>
    );
}

if (!dashboardData) {
    return (
        <div className="loading-screen">
            <h1>Loading Dashboard...</h1>
        </div>
    );
}

    

   
    
    return (
    <div className="dashboard">

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

        <section className="stats-section">

            <h2>Quick Stats</h2>
            {/* visit every object inside the array,create one statcard. */}
            <div className="stats-grid">
            {
            dashboardData.stats.map((stat) => (
            <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
            />
))
        }

    </div>
            

        </section>

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
                            if (feature.title === "Review My Code") {
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
        <section className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
                {dashboardData.activities.map((activity) => (
                    <div className="activity-item" key={activity.text}>
                    <span>{activity.text}</span>
                    <small>{activity.time}</small>
                    </div>
                ))}
            </div>
        </section>

        <section className="goal-section">

        <h2>Today's Goal</h2>

        <div className="goal-card">

            <div className="goal-header">

                <h3>{dashboardData.goal.title}</h3>

                <span>{dashboardData.goal.progress}</span>

            </div>

            <p className="goal-description">
                {dashboardData.goal.description}
            </p>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{
                        width: dashboardData.goal.progress
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
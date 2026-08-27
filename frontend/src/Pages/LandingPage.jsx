import { useNavigate } from "react-router-dom";
import { Code2, Mic, Zap, Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/Howitworks/Howitworks";
import Footer from "../components/Footer/Footer";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleGetStarted = () => {
        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    const showcaseFeatures = [
        {
            icon: Code2,
            tag: "Algorithmic Precision",
            title: "Deep Static & Dynamic Code Review",
            description: "Instant analysis covering correctness, edge case vulnerabilities, runtime efficiency, and Big-O notation complexity verification."
        },
        {
            icon: Mic,
            tag: "Interactive Dialogue",
            title: "Simulated Technical Interview",
            description: "Practice answering prompt-based interview questions, articulating design decisions, and receiving real-time score calibrations."
        },
        {
            icon: Cpu,
            tag: "AI Calibrated",
            title: "Adaptive DSA Skill Benchmarking",
            description: "Continuous progress tracking with historical reviews, identified strengths, and prioritized optimization roadmaps."
        }
    ];

    return (
        <div className="landing-page-root">
            <Navbar />
            <Hero />

            {/* Features Showcase Section */}
            <section className="landing-features-section" id="features">
                <div className="landing-features-container">
                    <div className="section-badge-center">
                        <span className="badge-tag">Engineered for Excellence</span>
                        <h2>Unrivaled Technical Preparation</h2>
                        <p className="section-lead">
                            Every component is designed to sharpen your problem-solving velocity and communication under interview conditions.
                        </p>
                    </div>

                    <div className="landing-features-grid">
                        {showcaseFeatures.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div className="luxury-feature-card" key={i}>
                                    <div className="card-ambient-orb"></div>
                                    <div className="feature-icon-box">
                                        <Icon size={24} />
                                    </div>
                                    <span className="feature-tag-chip">{f.tag}</span>
                                    <h3>{f.title}</h3>
                                    <p>{f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <HowItWorks />

            {/* Luxury Call to Action Banner */}
            <section className="landing-cta-section">
                <div className="cta-glow-backdrop"></div>
                <div className="cta-container">
                    <div className="cta-badge">
                        <Sparkles size={14} />
                        <span>Ready to Ace Your Next Interview?</span>
                    </div>
                    <h2>Start Your Preparation with AlgoMock Today</h2>
                    <p>
                        Join hundreds of ambitious software engineers practicing with AI-driven interview evaluation.
                    </p>
                    <button className="cta-launch-button" onClick={handleGetStarted}>
                        <span>Get Started for Free</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default LandingPage;
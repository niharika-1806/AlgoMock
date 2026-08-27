import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Code2, ArrowRight } from "lucide-react";
import "./Navbar.css";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        function handleAuthChange() {
            setIsLoggedIn(
                Boolean(localStorage.getItem("token"))
            );
        }

        function handleScroll() {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("authChange", handleAuthChange);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (
        <header className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
            <nav className="navbar">

                <Link to="/" className="logo">
                    <div className="logo-icon-wrap">
                        <Code2 className="logo-icon" size={20} />
                    </div>
                    <span className="logo-text">
                        Algo<span>Mock</span>
                    </span>
                    <span className="live-status-pill">
                        <span className="live-dot"></span>
                        AI 2.0
                    </span>
                </Link>

                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#practice">Practice</a></li>
                </ul>

                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <Link
                            to="/dashboard"
                            className="nav-btn-secondary"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="nav-btn-secondary"
                        >
                            Log In
                        </Link>
                    )}

                    <Link
                        to={isLoggedIn ? "/dashboard" : "/login"}
                        className="nav-btn-primary"
                    >
                        <span>{isLoggedIn ? "Open Dashboard" : "Get Started"}</span>
                        <ArrowRight size={15} className="btn-arrow" />
                    </Link>
                </div>

            </nav>
        </header>
    );
}

export default Navbar;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Code2, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../../utils/api";
import "./Navbar.css";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );
    const [isAdmin, setIsAdmin] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        async function checkAdminStatus() {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoggedIn(false);
                setIsAdmin(false);
                return;
            }

            setIsLoggedIn(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setIsAdmin(data.role === "ADMIN");
                } else {
                    setIsAdmin(false);
                }
            } catch {
                setIsAdmin(false);
            }
        }

        function handleAuthChange() {
            checkAdminStatus();
        }

        function handleScroll() {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        checkAdminStatus();
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
                        <>
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="nav-btn-secondary"
                                >
                                    Admin
                                </Link>
                            )}
                            <Link
                                to="/dashboard"
                                className="nav-btn-primary"
                            >
                                <span>Dashboard</span>
                                <ArrowRight size={15} className="btn-arrow" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="nav-btn-secondary"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="nav-btn-primary"
                            >
                                <span>Sign Up Free</span>
                                <ArrowRight size={15} className="btn-arrow" />
                            </Link>
                        </>
                    )}
                </div>

            </nav>
        </header>
    );
}

export default Navbar;
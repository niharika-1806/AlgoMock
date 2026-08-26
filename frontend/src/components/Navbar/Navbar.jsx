import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );

    useEffect(() => {

        function handleAuthChange() {

            setIsLoggedIn(
                Boolean(localStorage.getItem("token"))
            );
        }

        window.addEventListener(
            "authChange",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleAuthChange
            );
        };

    }, []);


    return (
        <nav className="navbar">

            <div className="logo">

                <span className="logo-text">
                    AlgoMock
                </span>

            </div>


            <ul className="nav-links">

                <li>Features</li>
                <li>Practice</li>
                <li>About</li>

            </ul>


            <div className="nav-buttons">

                {isLoggedIn ? (

                    <Link
                        to="/dashboard"
                        className="login-btn"
                    >
                        Dashboard
                    </Link>

                ) : (

                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>

                )}


                <Link
                    to={isLoggedIn ? "/dashboard" : "/login"}
                    className="primary-btn"
                >
                    {isLoggedIn
                        ? "Go to Dashboard"
                        : "Get Started"}
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;
import { Navigate } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm/LoginForm";

function LoginPage() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (

        <div className="login-page">

            <Link to="/" className="back-home">

                ← Back to Home

            </Link>

            <LoginForm />

        </div>

    );

}

export default LoginPage;
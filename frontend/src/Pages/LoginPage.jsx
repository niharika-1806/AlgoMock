import { Navigate, Link } from "react-router-dom";
import LoginForm from "../components/Loginform/Loginform";
import "./LoginPage.css";

function LoginPage() {

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
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
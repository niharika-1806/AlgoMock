import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../../utils/api";
import "./LoginForm.css";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function handleSubmit(event) {

        event.preventDefault();

        // Clear previous errors
        setEmailError("");
        setPasswordError("");

        let hasError = false;


        // -------------------------------
        // Empty field validation
        // -------------------------------

        if (email.trim() === "") {
            setEmailError("Email is required.");
            hasError = true;
        }

        if (password.trim() === "") {
            setPasswordError("Password is required.");
            hasError = true;
        }

        if (hasError) {
            return;
        }


        // -------------------------------
        // Email validation
        // -------------------------------

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }


        // -------------------------------
        // Password validation
        // -------------------------------

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }


        // -------------------------------
        // Login request
        // -------------------------------

        try {
            setLoading(true);

            const response = await fetch(
                `${API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );


            // -------------------------------
            // Authentication failure
            // -------------------------------

            if (response.status === 401) {
                setPasswordError("Invalid email or password.");
                return;
            }


            // -------------------------------
            // Other backend error
            // -------------------------------

            if (!response.ok) {
                setPasswordError("Something went wrong. Please try again.");
                return;
            }


            // -------------------------------
            // Get JWT
            // -------------------------------

            const token = await response.text();

            if (!token || token.trim() === "") {
                setPasswordError("Login failed. No authentication token received.");
                return;
            }


            // -------------------------------
            // Store JWT
            // -------------------------------

            localStorage.setItem("token", token.trim());
            window.dispatchEvent(new Event("authChange"));
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            setPasswordError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <form
            className="login-form-card"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="login-header">
                <div className="login-badge">
                    <Sparkles size={13} />
                    <span>Candidate Portal</span>
                </div>
                <h2>Welcome Back</h2>
                <p>Sign in to continue your interview preparation.</p>
            </div>

            {/* Email Field */}
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className={`input-wrapper ${emailError ? "has-error" : ""}`}>
                    <Mail size={18} className="input-icon" />
                    <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={loading}
                    />
                </div>
                {emailError && (
                    <div className="form-error-msg">
                        <AlertCircle size={14} />
                        <span>{emailError}</span>
                    </div>
                )}
            </div>

            {/* Password Field */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className={`input-wrapper ${passwordError ? "has-error" : ""}`}>
                    <Lock size={18} className="input-icon" />
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={loading}
                    />
                </div>
                {passwordError && (
                    <div className="form-error-msg">
                        <AlertCircle size={14} />
                        <span>{passwordError}</span>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="btn-spinner" />
                        <span>Authenticating...</span>
                    </>
                ) : (
                    <>
                        <span>Sign In to AlgoMock</span>
                        <ArrowRight size={16} />
                    </>
                )}
            </button>

            <div className="signup-footer-switch">
                <span>Don't have an account? </span>
                <Link to="/signup" className="switch-auth-link">Sign Up Free</Link>
            </div>

            <div className="login-footer-hint">
                <span>Demo user credentials: </span>
                <code>testuser@algomock.com / password123</code>
            </div>
        </form>
    );
}

export default LoginForm;
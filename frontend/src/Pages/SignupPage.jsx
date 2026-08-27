import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "../utils/api";
import "./SignupPage.css";

function SignupPage() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setGeneralError("");

        let hasError = false;

        if (name.trim() === "") {
            setNameError("Full name is required.");
            hasError = true;
        }

        if (email.trim() === "") {
            setEmailError("Email address is required.");
            hasError = true;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.trim())) {
                setEmailError("Please enter a valid email address.");
                hasError = true;
            }
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            hasError = true;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password
                })
            });

            if (response.status === 409 || response.status === 400) {
                const errorMsg = await response.text();
                if (errorMsg && errorMsg.toLowerCase().includes("email already")) {
                    setEmailError("This email address is already registered. Please sign in.");
                } else {
                    setGeneralError(errorMsg || "Registration failed. Please check your details.");
                }
                return;
            }

            if (!response.ok) {
                const errorMsg = await response.text();
                setGeneralError(errorMsg || "Something went wrong during sign up. Please try again.");
                return;
            }

            const data = await response.json();

            // If token returned, auto login
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.dispatchEvent(new Event("authChange"));
                navigate("/dashboard");
            } else {
                // Fallback login call
                const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.trim().toLowerCase(), password: password })
                });

                if (loginRes.ok) {
                    const jwtToken = await loginRes.text();
                    localStorage.setItem("token", jwtToken.trim());
                    window.dispatchEvent(new Event("authChange"));
                    navigate("/dashboard");
                } else {
                    navigate("/login");
                }
            }

        } catch (error) {
            console.error("Sign up error:", error);
            setGeneralError("Unable to connect to the server. Please ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-page">

            <Link to="/" className="back-home">
                ← Back to Home
            </Link>

            <form className="signup-form-card" onSubmit={handleSubmit} noValidate>

                <div className="signup-header">
                    <div className="signup-badge">
                        <Sparkles size={13} />
                        <span>Start Your Preparation</span>
                    </div>
                    <h2>Create an Account</h2>
                    <p>Join AlgoMock to start AI-powered coding reviews and mock interviews.</p>
                </div>

                {generalError && (
                    <div className="signup-general-error">
                        <AlertCircle size={16} />
                        <span>{generalError}</span>
                    </div>
                )}

                {/* Full Name */}
                <div className="form-group">
                    <label htmlFor="signup-name">Full Name</label>
                    <div className={`input-wrapper ${nameError ? "has-error" : ""}`}>
                        <User size={18} className="input-icon" />
                        <input
                            id="signup-name"
                            type="text"
                            placeholder="e.g. Alex Rivera"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    {nameError && (
                        <div className="form-error-msg">
                            <AlertCircle size={14} />
                            <span>{nameError}</span>
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="signup-email">Email Address</label>
                    <div className={`input-wrapper ${emailError ? "has-error" : ""}`}>
                        <Mail size={18} className="input-icon" />
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <div className={`input-wrapper ${passwordError ? "has-error" : ""}`}>
                        <Lock size={18} className="input-icon" />
                        <input
                            id="signup-password"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                {/* Confirm Password */}
                <div className="form-group">
                    <label htmlFor="signup-confirm-password">Confirm Password</label>
                    <div className={`input-wrapper ${confirmPasswordError ? "has-error" : ""}`}>
                        <ShieldCheck size={18} className="input-icon" />
                        <input
                            id="signup-confirm-password"
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    {confirmPasswordError && (
                        <div className="form-error-msg">
                            <AlertCircle size={14} />
                            <span>{confirmPasswordError}</span>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="signup-submit-btn" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 size={18} className="btn-spinner" />
                            <span>Creating Account...</span>
                        </>
                    ) : (
                        <>
                            <span>Create Free Account</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>

                <div className="signup-footer-switch">
                    <span>Already have an account? </span>
                    <Link to="/login" className="switch-auth-link">Sign In</Link>
                </div>

            </form>

        </div>
    );
}

export default SignupPage;

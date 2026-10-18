import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Loginform.css";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();

        // Clear previous errors
        setEmailError("");
        setPasswordError("");

        let hasError = false;

        // Empty email validation
        if (email.trim() === "") {
            setEmailError("Email is required.");
            hasError = true;
        }

        // Empty password validation
        if (password.trim() === "") {
            setPasswordError("Password is required.");
            hasError = true;
        }

        // Stop if any field is empty
        if (hasError) {
            return;
        }

        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        // Password length validation
        if (password.length < 8) {
            setPasswordError(
                "Password must be at least 8 characters long."
            );
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {

                if (response.status === 401) {
                    setPasswordError(
                        "Invalid email or password."
                    );
                } else {
                    setPasswordError(
                        "Something went wrong. Please try again."
                    );
                }

                return;
            }

            const token = await response.text();

            // Store JWT
            localStorage.setItem("token", token);

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            setPasswordError(
                "Unable to connect to the server. Please try again."
            );
        }
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
        >

            <h1>Welcome Back 👋</h1>

            <p>
                Continue your coding interview preparation.
            </p>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />

            {emailError && (
                <p className="error">
                    {emailError}
                </p>
            )}

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
            />

            {passwordError && (
                <p className="error">
                    {passwordError}
                </p>
            )}

            <button type="submit">
                Login
            </button>

        </form>
    );
}

export default LoginForm;
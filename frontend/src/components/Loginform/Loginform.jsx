import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

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

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            setEmailError(
                "Please enter a valid email address."
            );

            return;
        }


        // -------------------------------
        // Password validation
        // -------------------------------

        if (password.length < 8) {

            setPasswordError(
                "Password must be at least 8 characters long."
            );

            return;
        }


        // -------------------------------
        // Login request
        // -------------------------------

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
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

                setPasswordError(
                    "Invalid email or password."
                );

                return;
            }


            // -------------------------------
            // Other backend error
            // -------------------------------

            if (!response.ok) {

                setPasswordError(
                    "Something went wrong. Please try again."
                );

                return;
            }


            // -------------------------------
            // Get JWT
            // -------------------------------

            const token = await response.text();

            if (!token || token.trim() === "") {

                setPasswordError(
                    "Login failed. No authentication token received."
                );

                return;
            }


            // -------------------------------
            // Store JWT
            // -------------------------------

           localStorage.setItem(
    "token",
    token.trim()
);

window.dispatchEvent(
    new Event("authChange")
);

navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

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

            <h1>
                Welcome Back 👋
            </h1>

            <p>
                Continue your coding interview preparation.
            </p>


            {/* Email */}

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


            {/* Password */}

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


            {/* Login */}

            <button type="submit">
                Login
            </button>

        </form>
    );
}

export default LoginForm;
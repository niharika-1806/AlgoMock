import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event)
    {
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
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }
        
        // Fake user (temporary until backend is ready)
        const fakeUser = {
            email: "admin@algomock.com",
            password: "12345678"
        };
        // Fake authentication
        if (
            email === fakeUser.email &&
            password === fakeUser.password
        ) 
    {
        localStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
    } else {
        setPasswordError("Invalid email or password.");
    }
    }

    return (

        <form className="login-form"
        onSubmit={handleSubmit}
        noValidate
        >

            <h1>Welcome Back 👋</h1>

            <p>
                Continue your coding interview preparation.
            </p>

            <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}

            <button>
                Login
            </button>

        </form>

    );
}

export default LoginForm;
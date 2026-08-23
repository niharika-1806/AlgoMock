import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/DashboardPage";
import ReviewPage from "./Pages/ReviewPage";

function App() {

    return (
        <Routes>
            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                    <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/review"
                element={
                <ProtectedRoute>
                    <ReviewPage />
                </ProtectedRoute>
    }
/>
        </Routes>
    );

}

export default App;

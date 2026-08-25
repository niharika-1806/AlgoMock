import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/DashboardPage";
import ReviewPage from "./Pages/ReviewPage";
import ReviewHistoryPage from "./Pages/ReviewHistoryPage";

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
            <Route
                path="/review-history"
                element={
                <ProtectedRoute>
                <ReviewHistoryPage />
                </ProtectedRoute>
                }
            />
        </Routes>
    );

}

export default App;

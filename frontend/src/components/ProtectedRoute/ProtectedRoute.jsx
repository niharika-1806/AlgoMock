import { Navigate } from "react-router-dom";

// telling the protected route to protect the children
function ProtectedRoute({children}){
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    // Children is a special prop anything between a component's opening and closing tags.
    return children;
}
export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check auth status
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;

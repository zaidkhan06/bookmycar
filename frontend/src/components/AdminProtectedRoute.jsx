import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
 const { isAuthenticated, loading } = useAdminAuth();

  if (loading) return null; // wait for localStorage to load
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  return children;
};

export default AdminProtectedRoute;

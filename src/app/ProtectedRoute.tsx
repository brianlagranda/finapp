import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

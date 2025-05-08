import { Navigate, Outlet } from "react-router";
import authStore from "../features/auth/model/authStore";

export const ProtectedRoute = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

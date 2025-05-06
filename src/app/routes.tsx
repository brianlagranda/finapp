import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "../app/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

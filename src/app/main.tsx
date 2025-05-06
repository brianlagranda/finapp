import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import AppRoutes from "../app/routes.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
);

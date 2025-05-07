import AppRoutes from "./routes";
import { AuthProvider } from "../features/auth/provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

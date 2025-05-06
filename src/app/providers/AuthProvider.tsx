import { useState, ReactNode } from "react";
import { AuthContext } from "../../features/auth/context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = email === "test@finapp.com" && password === "test123";
        if (isValid) {
          setIsAuthenticated(true);
        }
        resolve(isValid);
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

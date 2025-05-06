import { useState } from "react";

export function useProvideAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, password: string) => {
    if (email === "test@finapp.com" && password === "test123") {
      setUser({ email });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
}

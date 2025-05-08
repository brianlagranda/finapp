import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: async (email, password) => {
        if (email === "test@finapp.com" && password === "test123") {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);

export default authStore;

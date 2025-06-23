import authStore from "../model/authStore";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const logout = authStore((state) => state.logout);

  return (
    <button
      onClick={logout}
      className="flex cursor-pointer items-center gap-2 hover:bg-blue-100 active:scale-95"
      aria-label="Log out"
      data-testid="logout-button"
    >
      <LogOut size={24} aria-hidden="true" />
      <span className="sr-only md:not-sr-only">Log Out</span>
    </button>
  );
};

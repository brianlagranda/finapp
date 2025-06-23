import { Header } from "../../../widgets/header/ui/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <main role="main" tabIndex={-1} className="mx-auto max-w-screen-xl px-4">
        {children}
      </main>
    </>
  );
};

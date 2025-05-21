import authStore from "../features/auth/model/authStore";

import Button from "../shared/ui/Button";

function Dashboard() {
  const logout = authStore((state) => state.logout);

  return (
    <>
      <div>Dashboard</div>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
}

export default Dashboard;

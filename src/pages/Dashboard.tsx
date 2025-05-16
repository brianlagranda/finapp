import authStore from "../features/auth/model/authStore";
import TransactionForm from "../features/transactions/ui/TransactionForm";
import TransactionsList from "../features/transactions/ui/TransactionsList";

import Button from "../shared/ui/Button";

function Dashboard() {
  const logout = authStore((state) => state.logout);

  return (
    <>
      <div>Dashboard</div>
      <TransactionForm />
      <TransactionsList />
      <br></br>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
}

export default Dashboard;

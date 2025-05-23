import authStore from "../features/auth/model/authStore";
import { Balance } from "../features/dashboard/ui/Balance";
import TransactionList from "../features/transactions/ui/TransactionList";

import Button from "../shared/ui/Button";

function Dashboard() {
  const logout = authStore((state) => state.logout);

  return (
    <>
      <div>Dashboard</div>
      <Balance />
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
        {<TransactionList />}
      </section>
      <Button className="text-sm" onClick={logout}>
        Log Out
      </Button>
    </>
  );
}

export default Dashboard;

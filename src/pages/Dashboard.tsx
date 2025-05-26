import { useState } from "react";
import authStore from "../features/auth/model/authStore";
import { Balance } from "../features/dashboard/ui/Balance";
import TransactionList from "../features/transactions/ui/TransactionList";

import Button from "../shared/ui/Button";
import TransactionForm from "../features/transactions/ui/TransactionForm";
import Modal from "../shared/ui/Modal";

function Dashboard() {
  const logout = authStore((state) => state.logout);
  const [renderTransactionForm, setRenderTransactionForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex w-full items-center">
        <h2 className="text-xl">Dashboard</h2>
        <Button className="text-sm" onClick={logout}>
          Log Out
        </Button>
      </div>
      <Balance />
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
        {<TransactionList />}
      </section>
      <Modal
        isOpen={renderTransactionForm}
        onClose={() => setRenderTransactionForm(false)}
      >
        <TransactionForm />
      </Modal>
      {!renderTransactionForm && (
        <Button
          className="my-4 flex text-sm"
          onClick={() => setRenderTransactionForm(true)}
        >
          + Add Transaction
        </Button>
      )}
    </>
  );
}

export default Dashboard;

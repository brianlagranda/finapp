import { useState } from "react";
import { Balance } from "../features/dashboard/ui/Balance";
import TransactionList from "../features/transactions/ui/TransactionList";

import TransactionForm from "../features/transactions/ui/TransactionForm";
import Modal from "../shared/ui/Modal";
import { AddTransactionButton } from "../features/dashboard/ui/AddTransactionButton";
import { LogoutButton } from "../features/auth/ui/LogoutButton";

function Dashboard() {
  const [renderTransactionForm, setRenderTransactionForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex justify-end p-2">
        <h1 className="sr-only">Dashboard</h1>
        <LogoutButton />
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
        <AddTransactionButton onClick={() => setRenderTransactionForm(true)} />
      )}
    </>
  );
}

export default Dashboard;

import { useState } from "react";
import { Balance } from "../../features/dashboard/ui/Balance";
import TransactionList from "../../features/transactions/ui/TransactionList";

import TransactionForm from "../../features/transactions/ui/TransactionForm";
import Modal from "../../shared/ui/Modal";
import { AddTransactionButton } from "../../features/dashboard/ui/AddTransactionButton";
import { DashboardLayout } from "./layout/DashboardLayout";

function Dashboard() {
  const [renderTransactionForm, setRenderTransactionForm] =
    useState<boolean>(false);

  return (
    <DashboardLayout>
      <h2 className="sr-only">Dashboard</h2>
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
    </DashboardLayout>
  );
}

export default Dashboard;

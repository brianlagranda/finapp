import { useState } from "react";
import { Balance } from "../../features/dashboard/ui/Balance";
import TransactionList from "../../features/transactions/ui/TransactionList";

import TransactionForm from "../../features/transactions/ui/TransactionForm";
import Modal from "../../shared/ui/Modal";
import { AddTransactionButton } from "../../features/dashboard/ui/AddTransactionButton";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Transaction } from "../../features/transactions/model/types";

function Dashboard() {
  const [renderTransactionForm, setRenderTransactionForm] =
    useState<boolean>(false);
  const [transactionMode, setTransactionMode] = useState<"create" | "edit">(
    "create",
  );
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >(undefined);

  const handleAddTransaction = () => {
    setTransactionToEdit(undefined);
    setRenderTransactionForm(true);
    setTransactionMode("create");
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setRenderTransactionForm(true);
    setTransactionMode("edit");
  };

  return (
    <DashboardLayout>
      <h2 className="sr-only">Dashboard</h2>
      <Balance />
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
        {<TransactionList onEditTransaction={handleEditTransaction} />}
      </section>
      <Modal
        isOpen={renderTransactionForm}
        onClose={() => setRenderTransactionForm(false)}
      >
        <TransactionForm
          mode={transactionMode}
          initialData={transactionToEdit}
        />
      </Modal>
      {!renderTransactionForm && (
        <AddTransactionButton onClick={() => handleAddTransaction()} />
      )}
    </DashboardLayout>
  );
}

export default Dashboard;

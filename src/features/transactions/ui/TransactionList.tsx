import { useState } from "react";
import { sortTransactionsByDateDesc } from "../lib/sortTransactions";
import useTransactionStore from "../model/useTransactionStore";
import { TransactionItem } from "./TransactionItem";
import toast from "react-hot-toast";
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import { Transaction } from "../model/types";

const TransactionList = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  const handleDeleteConfirmed = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete.id);
      toast.success("Transaction succesfully deleted");
      setTransactionToDelete(null);
    }
  };

  const transactionsOrderedByDate = sortTransactionsByDateDesc(transactions);

  const emptyTransactionsMessage =
    "No transactions yet. Start by adding your first one.";

  if (!transactions.length) {
    return (
      <p className="text-center text-gray-500">{emptyTransactionsMessage}</p>
    );
  }

  return (
    <>
      <table
        className="w-full text-left text-sm"
        aria-label="Transactions table"
      >
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Cat.</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2" aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          {transactionsOrderedByDate.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={() => setTransactionToDelete(transaction)}
            />
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
      >
        <div>
          <p className="text-lg font-semibold">
            Are you sure you want to delete{" "}
            {`"${transactionToDelete?.title} - ${transactionToDelete?.description ? transactionToDelete.description : ""}"`}{" "}
            transaction?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={() => setTransactionToDelete(null)}>Cancel</Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={handleDeleteConfirmed}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransactionList;

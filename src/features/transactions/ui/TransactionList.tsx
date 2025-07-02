import { useState } from "react";
import useTransactionStore from "../model/useTransactionStore";
import { TransactionItem } from "./TransactionItem";
import toast from "react-hot-toast";
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import { Transaction } from "../model/types";
import { useSortedTransactions } from "../hooks/useSortedTransactions";
import { useSortControl } from "../hooks/useSortControl";

const TransactionList = () => {
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

  const sortedTransactions = useSortedTransactions();

  const { sortKey, sortDirection, handleHeaderClick } = useSortControl();

  const arrowDirection = sortDirection === "asc" ? "↑" : "↓";

  const emptyTransactionsMessage =
    "No transactions yet. Start by adding your first one.";

  if (!sortedTransactions.length) {
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
            <th
              onClick={() => handleHeaderClick("category")}
              className="cursor-pointer px-2 py-1 text-sm select-none sm:px-4 sm:py-2"
            >
              Cat. {sortKey === "category" ? arrowDirection : ""}
            </th>
            <th
              onClick={() => handleHeaderClick("date")}
              className={`cursor-pointer px-2 py-1 text-sm select-none sm:px-4 sm:py-2 ${
                sortKey === "date" ? "text-primary font-semibold" : ""
              }`}
            >
              Date {sortKey === "date" ? arrowDirection : ""}
            </th>
            <th
              onClick={() => handleHeaderClick("title")}
              className="cursor-pointer px-2 py-1 text-sm select-none sm:px-4 sm:py-2"
            >
              Title {sortKey === "title" ? arrowDirection : ""}
            </th>
            <th
              onClick={() => handleHeaderClick("amount")}
              className="cursor-pointer px-2 py-1 text-sm select-none sm:px-4 sm:py-2"
            >
              Amount {sortKey === "amount" ? arrowDirection : ""}
            </th>
            <th
              className="px-2 py-1 text-sm select-none sm:px-4 sm:py-2"
              aria-label="Actions"
            ></th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
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
            {`"${transactionToDelete?.title} - ${transactionToDelete?.description ?? ""}"`}{" "}
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

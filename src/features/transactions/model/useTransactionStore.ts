import { create } from "zustand";
import { Transaction } from "../../auth/model/types";
import { persist } from "zustand/middleware";

interface TransactionState {
  transactions: Array<Transaction>;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction(id: string): void;
}

const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...tx, id: tx.id ?? crypto.randomUUID() },
          ],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id,
          ),
        })),
    }),
    {
      name: "transactions-storage",
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);

export default useTransactionStore;

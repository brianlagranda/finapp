import { create } from "zustand";
import { Transaction } from "../../auth/model/types";
import { persist } from "zustand/middleware";

interface TransactionState {
  transactions: Array<Transaction>;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction(id: string): void;
  getBalance: () => number;
}

const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
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
      getBalance: () => {
        return get().transactions.reduce(
          (acc, curr) =>
            acc + (curr.type === "income" ? curr.amount : -curr.amount),
          0,
        );
      },
    }),
    {
      name: "transactions-storage",
      partialize: (state): Partial<TransactionState> => ({
        transactions: state.transactions ?? [],
      }),
    },
  ),
);

export default useTransactionStore;

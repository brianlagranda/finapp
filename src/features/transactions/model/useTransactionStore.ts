import { create } from "zustand";
import { Transaction, SortKey, SortDirection } from "./types";
import { persist } from "zustand/middleware";
import { normalizedAmount } from "../lib/normalizedAmount";

interface TransactionState {
  transactions: Array<Transaction>;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (updatedTransaction: Transaction) => void;
  deleteTransaction(id: string): void;
  getBalance: () => number;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
}

const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: transaction.id ?? crypto.randomUUID(),
              amount: normalizedAmount(transaction),
            },
          ],
        })),

      updateTransaction: (updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? {
                  ...transaction,
                  ...updatedTransaction,
                  amount: normalizedAmount(updatedTransaction),
                }
              : transaction,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id,
          ),
        })),

      getBalance: () => {
        return get().transactions.reduce(
          (total, transaction) => total + transaction.amount,
          0,
        );
      },

      sortKey: "none",
      sortDirection: "desc",

      setSortKey: (key) => set({ sortKey: key }),

      setSortDirection: (direction) => set({ sortDirection: direction }),

      toggleSortDirection: () => {
        const current = get().sortDirection;
        set({ sortDirection: current === "asc" ? "desc" : "asc" });
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

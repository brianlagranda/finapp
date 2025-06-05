import { create } from "zustand";
import { Transaction } from "./types";
import { persist } from "zustand/middleware";
import { normalizedAmount } from "../lib/normalizedAmount";

interface TransactionState {
  transactions: Array<Transaction>;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction(id: string): void;
  getBalance: () => number;
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

import { useMemo } from "react";
import useTransactionStore from "../model/useTransactionStore";
import { SortKey, Transaction } from "../model/types";

export function useSortedTransactions() {
  const transactions = useTransactionStore((s) => s.transactions);
  const sortKey = useTransactionStore((s) => s.sortKey);
  const sortDirection = useTransactionStore((s) => s.sortDirection);

  const sortedTransactions = useMemo(() => {
    const compareFn = compareFns[sortKey];

    const sorted = [...transactions].sort((a, b) => {
      const result = compareFn(a, b);
      return sortDirection === "asc" ? result : -result;
    });

    return sorted;
  }, [transactions, sortKey, sortDirection]);

  return sortedTransactions;
}

const compareFns: Record<SortKey, (a: Transaction, b: Transaction) => number> =
  {
    none: (a, b) => b.id.localeCompare(a.id),
    date: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    amount: (a, b) => a.amount - b.amount,
    title: (a, b) => a.title.localeCompare(b.title),
    category: (a, b) => a.category.localeCompare(b.category),
  };

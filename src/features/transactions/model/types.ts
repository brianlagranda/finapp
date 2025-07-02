export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
};

export type SortDirection = "asc" | "desc";

export type SortKey =
  | keyof Pick<Transaction, "category" | "date" | "title" | "amount">
  | "none";

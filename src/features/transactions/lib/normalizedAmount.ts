import { Transaction } from "../model/types";

export const normalizedAmount = (transaction: Transaction) =>
  Math.abs(transaction.amount) * (transaction.type === "income" ? 1 : -1);

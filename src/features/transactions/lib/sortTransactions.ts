import { Transaction } from "../model/types";

export const sortTransactionsByDateDesc = (transactions: Transaction[]) =>
  [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

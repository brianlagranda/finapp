import { sortTransactionsByDateDesc } from "../lib/sortTransactions";
import useTransactionStore from "../model/useTransactionStore";
import { TransactionItem } from "./TransactionItem";

const TransactionList = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const transactionsOrderedByDate = sortTransactionsByDateDesc(transactions);

  const emptyTransactionsMessage =
    "No transactions yet. Start by adding your first one.";

  if (!transactions.length) {
    return (
      <p className="text-center text-gray-500">{emptyTransactionsMessage}</p>
    );
  }

  return (
    <table className="w-full text-left text-sm" aria-label="Transactions table">
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
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;

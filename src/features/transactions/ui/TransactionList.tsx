import useTransactionStore from "../model/useTransactionStore";
import { TransactionItem } from "./TransactionItem";

const TransactionList = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <table className="text-md w-full text-left">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2">Cat.</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;

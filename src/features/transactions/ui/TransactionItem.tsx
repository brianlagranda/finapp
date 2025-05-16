import { Transaction } from "../model/types";
import useTransactionStore from "../model/useTransactionStore";

interface Props {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: Props) => {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  return (
    <tr key={transaction.id}>
      <td className="px-4 py-2">{transaction.category.slice(0, 4)}</td>
      <td className="px-4 py-2">{transaction.date}</td>
      <td className="py-2 pl-2">{transaction.title}</td>
      <td className="px-4 py-2">
        {transaction.type === "income"
          ? transaction.amount
          : -transaction.amount}
      </td>
      <td className="py-2 pr-2">
        <button
          className="cursor-pointer text-2xl text-red-500 transition-colors hover:text-red-700"
          onClick={() => deleteTransaction(transaction.id)}
        >
          🗑
        </button>
      </td>
    </tr>
  );
};

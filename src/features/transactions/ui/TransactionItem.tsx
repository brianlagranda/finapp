import { Transaction } from "../model/types";

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionItem = ({ transaction, onDelete }: Props) => {
  return (
    <tr>
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
          onClick={() => onDelete(transaction.id)}
        >
          🗑
        </button>
      </td>
    </tr>
  );
};

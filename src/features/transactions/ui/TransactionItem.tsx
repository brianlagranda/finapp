import { MoreHorizontal } from "lucide-react";
import { categories } from "../../../shared/constants/categories";
import { Transaction } from "../model/types";

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionItem = ({ transaction, onDelete }: Props) => {
  const categoryData = categories.find(
    (category) => category.value === transaction.category,
  );
  const Icon = categoryData?.icon ?? MoreHorizontal;

  return (
    <tr>
      <td className="px-4 py-2">
        <div className="flex items-center sm:hidden">
          <span
            className="text-accent inline-block"
            aria-label={categoryData?.label ?? transaction.category}
            title={categoryData?.label ?? transaction.category}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <span className="hidden sm:inline">{transaction.category}</span>
      </td>
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

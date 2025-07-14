import { Trash2, MoreHorizontal, Pencil } from "lucide-react";
import { formatCurrency } from "../../dashboard/lib/formatCurrency";
import { categories } from "../../../shared/constants/categories";
import { Transaction } from "../model/types";
import { formatTransactionDate } from "../lib/formatTransactionDate";

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

export const TransactionItem = ({ transaction, onDelete, onEdit }: Props) => {
  const categoryData = categories.find(
    (category) => category.value === transaction.category,
  );
  const Icon = categoryData?.icon ?? MoreHorizontal;

  return (
    <tr>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
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

      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
        {formatTransactionDate(transaction.date)}
      </td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">{transaction.title}</td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
        <div className="flex gap-1">
          <button
            className="text-apple-500 hover:bg-apple-300 hover:text-apple-800 flex cursor-pointer items-center gap-1 rounded-md p-1 active:scale-95 md:p-2"
            onClick={() => onEdit()}
          >
            <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden md:inline">Edit</span>
          </button>
          <button
            className="flex cursor-pointer items-center gap-1 rounded-md p-1 text-red-500 hover:bg-red-300 hover:text-red-800 active:scale-95 md:p-2"
            onClick={() => onDelete(transaction.id)}
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden md:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

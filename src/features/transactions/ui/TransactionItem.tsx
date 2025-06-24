import { Trash2, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "../../dashboard/lib/formatCurrency";
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

      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">{transaction.date}</td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">{transaction.title}</td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-2 py-1 text-sm sm:px-4 sm:py-2">
        <button
          className="flex items-center gap-1 rounded-md p-1 text-red-500 hover:bg-red-300 hover:text-red-800 active:scale-95 md:p-2"
          onClick={() => onDelete(transaction.id)}
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden md:inline">Eliminar</span>
        </button>
      </td>
    </tr>
  );
};
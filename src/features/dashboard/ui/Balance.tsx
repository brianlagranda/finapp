import useTransactionStore from "../../transactions/model/useTransactionStore";
import { formatCurrency } from "../lib/formatCurrency";

export const Balance = () => {
  const balance = useTransactionStore((state) => state.getBalance());

  const balanceColor = balance < 0 ? "text-red-600" : "text-green-700";

  return (
    <div
      aria-live="polite"
      className={`mx-auto my-6 max-w-xs rounded-md border border-gray-300 p-4 text-center text-3xl font-semibold shadow-md ${balanceColor}`}
    >
      {formatCurrency(balance, "en-US", "USD")}
    </div>
  );
};

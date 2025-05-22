import useTransactionStore from "../../transactions/model/useTransactionStore";
import { formatCurrency } from "../lib/formatCurrency";

export const Balance = () => {
  const balance = useTransactionStore((state) => state.getBalance());

  return (
    <div
      className={`m-2 rounded-md border border-black p-2 text-center text-3xl ${balance < 0 ? "text-red-500" : "text-green-600"}`}
    >
      {formatCurrency(balance, "en-US", "USD")}
    </div>
  );
};

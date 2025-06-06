import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AddTransactionButton = ({ onClick, ...props }: ButtonProps) => {
  return (
    <button
      aria-label="Add Transaction"
      onClick={onClick}
      className="btn-icon fixed right-4 bottom-4 z-50 overflow-hidden rounded-full active:scale-95"
      {...props}
    >
      <Plus size={44} strokeWidth={1.5} className="" />
    </button>
  );
};

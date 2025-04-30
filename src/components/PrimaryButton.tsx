import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`bg-accent hover:bg-accent-hover disabled:hover:bg-accent mx-auto w-fit cursor-pointer rounded-md px-8 py-2.5 text-2xl disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ children, className = "", variant = "primary", ...rest }: Props) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white disabled:opacity-50 transition-colors rounded-[5px]";
  
  const variantStyles = variant === "primary" 
    ? "bg-[#EF4444] hover:bg-[#DC2626] border border-transparent"
    : "bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-white";
  
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

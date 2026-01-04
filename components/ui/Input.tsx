import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  return (
    <input
      className="w-full rounded-[5px] border border-white/20 bg-[#1A1A1A] px-3 py-2 text-sm text-white placeholder:text-[#EEEEEE]/60 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-colors"
      {...props}
    />
  );
}

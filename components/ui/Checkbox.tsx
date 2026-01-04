import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: Props) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#EF4444] focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-0 focus:ring-offset-[#1A1A1A] cursor-pointer"
      {...props}
    />
  );
}

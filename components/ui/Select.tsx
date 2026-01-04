import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: Props) {
  return (
    <select
      className="w-full rounded-[5px] border border-white/20 bg-[#1A1A1A] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-colors"
      {...props}
    />
  );
}

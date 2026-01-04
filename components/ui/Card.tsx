import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[5px] border border-white/10 bg-[#1A1A1A] p-4 md:p-6">
      {children}
    </div>
  );
}

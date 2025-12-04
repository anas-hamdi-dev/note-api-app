import type { ReactNode } from "react";
import { formatCurrency } from "../../lib/formatters";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent?: "income" | "expense" | "balance";
}

const accentStyles: Record<NonNullable<StatCardProps["accent"]>, string> = {
  income: "bg-emerald-50 text-emerald-600",
  expense: "bg-rose-50 text-rose-600",
  balance: "bg-primary-50 text-primary-600",
};

export function StatCard({ label, value, icon, accent = "balance" }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100 flex flex-col gap-3">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentStyles[accent]}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{formatCurrency(value)}</p>
    </div>
  );
}


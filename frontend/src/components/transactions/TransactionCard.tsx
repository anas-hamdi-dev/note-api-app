import { formatCurrency, formatDate } from "../../lib/formatters";
import clsx from "clsx";

interface Props {
  title: string;
  amount: number;
  date: string;
  metaLabel: string;
  notes?: string;
  tone: "income" | "expense";
  onDelete: () => void;
}

export function TransactionCard({ title, amount, date, metaLabel, notes, tone, onDelete }: Props) {
  return (
    <div className="group relative rounded-3xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{metaLabel}</p>
        </div>
        <p className={clsx("text-sm font-semibold", tone === "income" ? "text-emerald-600" : "text-rose-600")}>
          {tone === "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{formatDate(date)}</span>
        {notes && <span className="truncate text-right">{notes}</span>}
      </div>
      <button
        onClick={onDelete}
        className="absolute right-4 top-4 hidden rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow group-hover:flex hover:border-rose-200 hover:text-rose-600"
      >
        Delete
      </button>
    </div>
  );
}


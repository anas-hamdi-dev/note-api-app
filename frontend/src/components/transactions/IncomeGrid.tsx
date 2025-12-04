import type { Income } from "../../types/api";
import { TransactionCard } from "./TransactionCard";

interface Props {
  data: Income[];
  onDelete: (id: string) => void;
}

export function IncomeGrid({ data, onDelete }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((income) => (
        <TransactionCard
          key={income._id}
          title={income.title}
          amount={income.amount}
          date={income.date}
          metaLabel={income.source || "General"}
          notes={income.notes}
          tone="income"
          onDelete={() => onDelete(income._id)}
        />
      ))}
      {!data.length && <p className="text-sm text-slate-500">No incomes yet. Add your first entry above.</p>}
    </div>
  );
}


import type { Expense } from "../../types/api";
import { TransactionCard } from "./TransactionCard";

interface Props {
  data: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseGrid({ data, onDelete }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((expense) => (
        <TransactionCard
          key={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          metaLabel={expense.category}
          notes={expense.notes}
          tone="expense"
          onDelete={() => onDelete(expense._id)}
        />
      ))}
      {!data.length && <p className="text-sm text-slate-500">No expenses yet. Add your first entry above.</p>}
    </div>
  );
}


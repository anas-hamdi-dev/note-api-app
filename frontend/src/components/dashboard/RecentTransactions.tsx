import type { Expense, Income } from "../../types/api";
import { formatCurrency, formatDate } from "../../lib/formatters";

interface RecentTransactionsProps {
  incomes: Income[];
  expenses: Expense[];
}

export function RecentTransactions({ incomes, expenses }: RecentTransactionsProps) {
  const incomeItems = incomes.map((income) => ({
    id: income._id,
    title: income.title,
    date: income.date,
    label: income.source || "General",
    amount: income.amount,
  }));

  const expenseItems = expenses.map((expense) => ({
    id: expense._id,
    title: expense.title,
    date: expense.date,
    label: expense.category,
    amount: expense.amount,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TransactionList title="Recent Income" items={incomeItems} tone="income" />
      <TransactionList title="Recent Expenses" items={expenseItems} tone="expense" />
    </div>
  );
}

interface DisplayItem {
  id: string;
  title: string;
  date: string;
  label: string;
  amount: number;
}

interface TransactionListProps {
  title: string;
  items: DisplayItem[];
  tone: "income" | "expense";
}

function TransactionList({ title, items, tone }: TransactionListProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">Latest five records</p>
        </div>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">
                {formatDate(item.date)} • {item.label}
              </p>
            </div>
            <p className={`text-sm font-semibold ${tone === "income" ? "text-emerald-600" : "text-rose-600"}`}>
              {tone === "income" ? "+" : "-"}
              {formatCurrency(item.amount)}
            </p>
          </li>
        ))}
        {!items.length && <p className="text-sm text-slate-500">No records yet.</p>}
      </ul>
    </div>
  );
}


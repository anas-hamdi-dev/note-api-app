import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import {
  fetchCategorySlices,
  fetchDashboardSummary,
  fetchMonthlySeries,
} from "../../api/routes";
import { StatCard } from "../../components/dashboard/StatCard";
import { RecentTransactions } from "../../components/dashboard/RecentTransactions";
import { TrendsChart } from "../../components/dashboard/TrendsChart";
import { ExportButtons } from "../../components/dashboard/ExportButtons";
import type { MonthlySeriesItem } from "../../types/api";

function buildMonthlyDataset(series: { incomes: MonthlySeriesItem[]; expenses: MonthlySeriesItem[] }) {
  const now = new Date();
  const months: { label: string; year: number; month: number }[] = [];
  for (let i = 11; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }

  function findTotal(collection: MonthlySeriesItem[], year: number, month: number) {
    return collection.find((item) => item._id.year === year && item._id.month === month)?.total || 0;
  }

  return months.map((month) => ({
    label: month.label,
    income: findTotal(series.incomes, month.year, month.month),
    expense: findTotal(series.expenses, month.year, month.month),
  }));
}

export function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
  });

  const { data: monthlySeries } = useQuery({
    queryKey: ["charts", "monthly"],
    queryFn: fetchMonthlySeries,
  });

  const { data: categorySlices } = useQuery({
    queryKey: ["charts", "categories"],
    queryFn: fetchCategorySlices,
  });

  const trendDataset = useMemo(() => {
    if (!monthlySeries) return [];
    return buildMonthlyDataset(monthlySeries);
  }, [monthlySeries]);

  if (summaryLoading || !summary) {
    return <p className="text-sm text-slate-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Monitor balance, revenue, and spend in one view.</p>
        </div>
        <ExportButtons />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Net balance"
          value={summary.balance}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          accent="balance"
        />
        <StatCard
          label="Total income"
          value={summary.totalIncome}
          icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
          accent="income"
        />
        <StatCard
          label="Total expenses"
          value={summary.totalExpense}
          icon={<ArrowTrendingDownIcon className="h-6 w-6" />}
          accent="expense"
        />
        <div className="rounded-3xl bg-primary-600 p-6 text-white shadow-card">
          <p className="text-sm uppercase tracking-wide text-white/80">Smart tips</p>
          <p className="mt-2 text-lg font-semibold">Export your full history</p>
          <p className="text-xs text-white/80">Use the export buttons to download Excel-ready ledgers.</p>
        </div>
      </div>

      <TrendsChart data={trendDataset} categories={categorySlices || []} />

      <RecentTransactions incomes={summary.recentIncomes} expenses={summary.recentExpenses} />
    </div>
  );
}


import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import type { CategorySlice } from "../../types/api";

interface TrendDatum {
  label: string;
  income: number;
  expense: number;
}

interface TrendsChartProps {
  data: TrendDatum[];
  categories: CategorySlice[];
}

const PIE_COLORS = ["#3a71f6", "#22c55e", "#f97316", "#ec4899", "#14b8a6", "#0ea5e9", "#facc15"];

export function TrendsChart({ data, categories }: TrendsChartProps) {
  const pieData = categories.map((category) => ({
    name: category._id,
    value: category.total,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">Income vs Expenses</p>
            <p className="text-xs text-slate-500">Last 12 months</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3a71f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3a71f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb7185" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="income" stroke="#1d4ed8" fillOpacity={1} fill="url(#income)" />
              <Area type="monotone" dataKey="expense" stroke="#fb7185" fillOpacity={1} fill="url(#expense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">Expense Breakdown</p>
            <p className="text-xs text-slate-500">Top categories</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


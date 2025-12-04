import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExpense, deleteExpense, fetchExpenses } from "../../api/routes";
import { ExpenseForm, type ExpenseFormValues } from "../../components/forms/ExpenseForm";
import { ExpenseGrid } from "../../components/transactions/ExpenseGrid";

export function ExpensePage() {
  const queryClient = useQueryClient();
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "monthly"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "categories"] });
      toast.success("Expense added");
    },
    onError: () => toast.error("Failed to add expense"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "monthly"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "categories"] });
      toast.success("Expense deleted");
    },
    onError: () => toast.error("Failed to delete expense"),
  });
  
  async function handleCreate(values: ExpenseFormValues) {
    await createMutation.mutateAsync(values);
  }

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
        <p className="text-sm text-slate-500">Categorize spending to see where money goes.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100">
          <p className="text-base font-semibold text-slate-900">New expense</p>
          <p className="text-xs text-slate-500">Tag categories to unlock detailed pie charts.</p>
          <div className="mt-4">
            <ExpenseForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-rose-400 p-6 text-white shadow-card">
          <p className="text-sm uppercase tracking-widest text-white/80">Insight</p>
          <p className="mt-2 text-2xl font-semibold">Track trends</p>
          <p className="text-sm text-white/80">Monitor categories monthly to catch runaway spend early.</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading expenses...</p>
      ) : (
        <ExpenseGrid data={expenses} onDelete={handleDelete} />
      )}
    </div>
  );
}


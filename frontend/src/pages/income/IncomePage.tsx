import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createIncome, deleteIncome, fetchIncomes } from "../../api/routes";
import { IncomeForm, type IncomeFormValues } from "../../components/forms/IncomeForm";
import { IncomeGrid } from "../../components/transactions/IncomeGrid";

export function IncomePage() {
  const queryClient = useQueryClient();
  const { data: incomes = [], isLoading } = useQuery({
    queryKey: ["incomes"],
    queryFn: fetchIncomes,
  });

  const createMutation = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "monthly"] });
      toast.success("Income added");
    },
    onError: () => toast.error("Failed to add income"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["charts", "monthly"] });
      toast.success("Income deleted");
    },
    onError: () => toast.error("Failed to delete income"),
  });

  async function handleCreate(values: IncomeFormValues) {
    await createMutation.mutateAsync(values);
  }

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Income</h1>
        <p className="text-sm text-slate-500">Capture every inflow to keep your balance accurate.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100">
          <p className="text-base font-semibold text-slate-900">New income</p>
          <p className="text-xs text-slate-500">Record salaries, bonuses, or side projects.</p>
          <div className="mt-4">
            <IncomeForm onSubmit={handleCreate} isLoading={createMutation.isPending} />
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-500 p-6 text-white shadow-card">
          <p className="text-sm uppercase tracking-widest text-white/80">Best practice</p>
          <p className="mt-2 text-2xl font-semibold">Tag sources</p>
          <p className="text-sm text-white/80">
            Including sources lets the dashboard highlight the most profitable channels.
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading incomes...</p>
      ) : (
        <IncomeGrid data={incomes} onDelete={handleDelete} />
      )}
    </div>
  );
}


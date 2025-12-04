import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(2),
  amount: z.number().positive(),
  date: z.string(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export type IncomeFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: IncomeFormValues) => Promise<void>;
  isLoading: boolean;
}

export function IncomeForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncomeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      source: "",
      notes: "",
    },
  });

  async function submit(values: IncomeFormValues) {
    await onSubmit(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600">Title</label>
        <input
          {...register("title")}
          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
          placeholder="Salary"
        />
        {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-600">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="1250"
          />
          {errors.amount && <p className="text-xs text-rose-500">{errors.amount.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Date</label>
          <input
            type="date"
            {...register("date")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
          {errors.date && <p className="text-xs text-rose-500">{errors.date.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-600">Source</label>
          <input
            {...register("source")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="Company"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Notes</label>
          <input
            {...register("notes")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="Quarterly bonus"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Add income"}
      </button>
    </form>
  );
}


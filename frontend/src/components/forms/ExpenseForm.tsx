import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categories = ["Housing", "Utilities", "Food", "Transport", "Health", "Education", "Entertainment", "Other"];

const schema = z.object({
  title: z.string().min(2),
  amount: z.number().positive(),
  date: z.string(),
  category: z.string().min(2),
  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
  isLoading: boolean;
}

export function ExpenseForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: categories[0],
      notes: "",
    },
  });

  async function submit(values: ExpenseFormValues) {
    await onSubmit(values);
    reset({ ...values, title: "", amount: 0, notes: "" });
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600">Title</label>
        <input
          {...register("title")}
          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
          placeholder="Groceries"
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
            placeholder="400"
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
          <label className="text-xs font-semibold text-slate-600">Category</label>
          <select
            {...register("category")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none bg-white"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-rose-500">{errors.category.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Notes</label>
          <input
            {...register("notes")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="Include household items"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Add expense"}
      </button>
    </form>
  );
}


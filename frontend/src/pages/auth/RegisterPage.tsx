import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AuthShell } from "./AuthShell";
import { useAuthContext } from "../../context/AuthContext";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterValues = z.infer<typeof schema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { handleRegister } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(schema) });

  async function submit(values: RegisterValues) {
    try {
      await handleRegister(values);
      toast.success("Account created!");
      navigate("/");
    } catch (error) {
      toast.error("Sign-up failed");
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Track income, expenses, and download financial insights."
      footerLabel="Already have an account?"
      footerLink={{ href: "/login", label: "Sign in" }}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">
            Full name
          </label>
          <input
            {...register("name")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="Alex Johnson"
          />
          {errors.name && (
            <p className="text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="you@email.com"
          />
          {errors.email && (
            <p className="text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-rose-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}

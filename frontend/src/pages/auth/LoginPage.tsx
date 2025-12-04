import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AuthShell } from "./AuthShell";
import { useAuthContext } from "../../context/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  async function submit(values: LoginValues) {
    try {
      await handleLogin(values);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your smart finance dashboard."
      footerLabel="No account yet?"
      footerLink={{ href: "/register", label: "Create one" }}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="you@email.com"
          />
          {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}


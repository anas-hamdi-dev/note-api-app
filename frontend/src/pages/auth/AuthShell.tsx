import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerLabel: string;
  footerLink: { href: string; label: string };
}

export function AuthShell({ title, subtitle, children, footerLabel, footerLink }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">ExpenseFlow</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        {children}
        <p className="mt-6 text-center text-sm text-slate-500">
          {footerLabel}{" "}
          <Link to={footerLink.href} className="text-primary-600 font-semibold hover:underline">
            {footerLink.label}
          </Link>
        </p>
      </div>
    </div>
  );
}


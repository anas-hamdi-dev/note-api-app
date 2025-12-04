import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Sidebar } from "./Sidebar";
import { useAuthContext } from "../../context/AuthContext";

export function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuthContext();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isMobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onLogout={() => {
          logout();
          setIsMobileOpen(false);
        }}
      />
      <main className="flex-1 lg:ml-0">
        <header className="flex items-center gap-4 bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 lg:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <Bars3Icon className="h-6 w-6 text-slate-700" />
          </button>
          <div>
            <p className="text-base font-semibold text-slate-900">Expense Intelligence</p>
            <p className="text-xs text-slate-500">Track, visualize, and export finances</p>
          </div>
        </header>
        <section className="px-6 py-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}


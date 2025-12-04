import { NavLink } from "react-router-dom";
import {
  CursorArrowRaysIcon,
  RectangleGroupIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAuthContext } from "../../context/AuthContext";

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const links = [
  { to: "/", label: "Dashboard", icon: RectangleGroupIcon },
  { to: "/incomes", label: "Income", icon: ArrowTrendingUpIcon },
  { to: "/expenses", label: "Expenses", icon: BanknotesIcon },
];

export function Sidebar({ isMobileOpen, onClose, onLogout }: SidebarProps) {
  const { user } = useAuthContext();

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-slate-900/50 transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl border-r border-slate-100 flex flex-col px-6 py-8 transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:shadow-none",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 text-primary-600">
          <CursorArrowRaysIcon className="h-8 w-8" />
          <div>
            <p className="text-base font-semibold tracking-wide">ExpenseFlow</p>
            <p className="text-xs text-slate-500">Smart finance tracker</p>
          </div>
        </div>

        <nav className="mt-10 flex-1 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-500 hover:text-primary-600 hover:bg-slate-50",
                )
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0] ?? "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}


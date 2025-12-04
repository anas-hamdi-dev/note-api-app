import { format } from "date-fns";

export function formatCurrency(value: number) {
  if (Number.isNaN(value)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string | Date) {
  if (!value) return "-";
  return format(new Date(value), "MMM dd, yyyy");
}


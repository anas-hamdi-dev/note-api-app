import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { downloadWorkbook } from "../../api/routes";
import toast from "react-hot-toast";

export function ExportButtons() {
  const [downloading, setDownloading] = useState<"incomes" | "expenses" | null>(null);

  async function handleDownload(type: "incomes" | "expenses") {
    try {
      setDownloading(type);
      const blob = await downloadWorkbook(type);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => handleDownload("incomes")}
        disabled={downloading === "incomes"}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 disabled:opacity-60"
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        Export incomes
      </button>
      <button
        type="button"
        onClick={() => handleDownload("expenses")}
        disabled={downloading === "expenses"}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 disabled:opacity-60"
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        Export expenses
      </button>
    </div>
  );
}


export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

export const STORAGE_KEYS = {
  token: "expense_token",
  user: "expense_user",
} as const;


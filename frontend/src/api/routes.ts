import client from "./client";
import type {
  AuthResponse,
  DashboardSummary,
  Expense,
  Income,
  MonthlySeriesItem,
  CategorySlice,
  ExpensePayload,
  IncomePayload,
} from "../types/api";

export async function login(payload: { email: string; password: string }) {
  const { data } = await client.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: { name: string; email: string; password: string }) {
  const { data } = await client.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function fetchDashboardSummary() {
  const { data } = await client.get<DashboardSummary>("/dashboard/summary");
  return data;
}

export async function fetchIncomes() {
  const { data } = await client.get<Income[]>("/incomes");
  return data;
}

export async function createIncome(payload: IncomePayload) {
  const { data } = await client.post<Income>("/incomes", payload);
  return data;
}

export async function deleteIncome(id: string) {
  await client.delete(`/incomes/${id}`);
}

export async function fetchExpenses() {
  const { data } = await client.get<Expense[]>("/expenses");
  return data;
}

export async function createExpense(payload: ExpensePayload) {
  const { data } = await client.post<Expense>("/expenses", payload);
  return data;
}

export async function deleteExpense(id: string) {
  await client.delete(`/expenses/${id}`);
}

export async function fetchMonthlySeries() {
  const { data } = await client.get<{ incomes: MonthlySeriesItem[]; expenses: MonthlySeriesItem[] }>("/charts/monthly");
  return data;
}

export async function fetchCategorySlices() {
  const { data } = await client.get<CategorySlice[]>("/charts/categories");
  return data;
}

export async function downloadWorkbook(type: "incomes" | "expenses") {
  const response = await client.get(`/export/${type}`, { responseType: "blob" });
  return response.data;
}


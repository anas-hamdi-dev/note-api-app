export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Income {
  _id: string;
  title: string;
  amount: number;
  date: string;
  source?: string;
  notes?: string;
}

export interface IncomePayload {
  title: string;
  amount: number;
  date: string;
  source?: string;
  notes?: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

export interface ExpensePayload {
  title: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  recentIncomes: Income[];
  recentExpenses: Expense[];
}

export interface MonthlySeriesItem {
  _id: {
    year: number;
    month: number;
  };
  total: number;
}

export interface CategorySlice {
  _id: string;
  total: number;
}


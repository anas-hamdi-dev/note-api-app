import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { login, register } from "../api/routes";
import type { AuthResponse, User } from "../types/api";
import { STORAGE_KEYS } from "../lib/constants";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  handleLogin: (payload: { email: string; password: string }) => Promise<void>;
  handleRegister: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.token);
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsBootstrapping(false);
  }, []);

  const persistAuth = useCallback((payload: AuthResponse) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem(STORAGE_KEYS.token, payload.token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(payload.user));
  }, []);

  const handleLogin = useCallback(
    async (payload: { email: string; password: string }) => {
      const auth = await login(payload);
      persistAuth(auth);
    },
    [persistAuth],
  );

  const handleRegister = useCallback(
    async (payload: { name: string; email: string; password: string }) => {
      const auth = await register(payload);
      persistAuth(auth);
    },
    [persistAuth],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isBootstrapping,
      handleLogin,
      handleRegister,
      logout,
    }),
    [user, token, isBootstrapping, handleLogin, handleRegister, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}


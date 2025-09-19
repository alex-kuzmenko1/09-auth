import { create } from "zustand";
import type { User } from "@/types/user";

type AuthStatus = "idle" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  login: (user: User) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  status: "idle",

  login: (user) => set({ user, status: "authenticated" }),
  logout: () => set({ user: null, status: "unauthenticated" }),
  reset: () => set({ user: null, status: "idle" }),
}));

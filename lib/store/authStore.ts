import { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthorized: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthorized: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({
      user,
      isAuthorized: true,
    }));
  },
  clearIsAuthenticated: () => {
    set(() => ({
      user: null,
      isAuthorized: false,
    }));
  },
}));
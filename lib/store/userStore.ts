import { create } from "zustand";
import { User } from "@/types/user";

type UserDraftStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserDraftStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
// lib/store/noteStore.ts
import { create } from "zustand";
import { FormValues } from "@/types/note";

type NoteStore = {
  draft: FormValues;
  setDraft: (draft: Partial<FormValues>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>((set) => ({
  draft: { title: "", content: "", tag: "All" }, 
  setDraft: (draft) => set((state) => ({ draft: { ...state.draft, ...draft } })),
  clearDraft: () => set({ draft: { title: "", content: "", tag: "All" } }),
}));

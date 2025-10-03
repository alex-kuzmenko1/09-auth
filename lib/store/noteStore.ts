import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TagList } from "@/types/note";


export interface Draft {
  title: string;
  content: string;
  tag: TagList;
}

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", 
    }
  )
);

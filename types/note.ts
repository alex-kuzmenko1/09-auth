export type TagList = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  title: string;
  content: string;
  tag: TagList;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: TagList;
}

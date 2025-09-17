export type Note = {
  id: string;
  title: string;
  content: string;
  tag?: string;
};

export type FormValues = {
  title: string;
  content: string;
  tag: string;
};

export type TagList = ("All" | "Work" | "Personal" | "Ideas" | "Other")[];

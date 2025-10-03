import type { Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  limit: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, limit, search };
  if (tag) params.tag = tag;

  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`/api/notes?${query}`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await fetch(`/api/notes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
};

export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
};

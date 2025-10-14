import { nextServer } from "@/lib/api/api";
import type { Note, NoteFormValues } from "@/types/note";
import { User } from "@/types/user";

interface NoteServiceProps {
  query: string;
  page: number;
  tag?: string;
}

interface NoteResponce {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ query, page, tag }: NoteServiceProps) => {
  const res = await nextServer.get<NoteResponce>(`/notes`, {
    params: {
      tag,
      search: query,
      page,
      perPage: 12,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`, {});
  return res.data;
};

export const createNote = async (newTodo: NoteFormValues): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newTodo, {});
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`, {});
  return res.data;
};
export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", {
    username: payload.username,
  });
  return res.data;
};
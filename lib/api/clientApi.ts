
import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { Note, NoteFormValues } from "@/types/note";
import { User } from "@/types/user";


export const nextServer: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});


export class ApiError<T = unknown> extends Error {
  public status?: number;
  public data?: T;
  public response?: AxiosResponse<T>;

  constructor(message: string, response?: AxiosResponse<T>) {
    super(message);
    this.name = "ApiError";
    this.response = response;
    this.status = response?.status;
    this.data = response?.data;
  }
}


export interface RegisterRequest {
  email: string;
  password: string;
  username?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type UpdateUserRequest = {
  username?: string;
};

export interface CheckSessionResponse {
  success: boolean;
}


interface NoteServiceProps {
  query: string;
  page: number;
  tag?: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ query, page, tag }: NoteServiceProps) => {
  const res = await nextServer.get<NotesResponse>("/notes", {
    params: { tag, search: query, page, perPage: 12 },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

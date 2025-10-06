import axios from "axios";
import type { Note } from "@/types/note";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

// ---------------- Notes API ----------------
export const fetchNotes = async (page = 1, query = ""): Promise<Note[]> => {
  const { data } = await api.get(`/notes?page=${page}&q=${query}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
export const getProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};


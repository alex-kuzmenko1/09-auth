
import axios from "axios";
import { User, AuthResponse } from "../../types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});


const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});


export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await publicApi.post("/auth/login", { email, password });
  return res.data;
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await publicApi.post("/auth/register", { email, password });
  return res.data;
}

export async function logout() {
  const res = await privateApi.post("/auth/logout");
  return res.data;
}

export async function session(): Promise<User | null> {
  const res = await privateApi.get("/auth/session");
  return res.data?.user ?? null;
}

// -------- NOTES --------
interface GetNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  //  limit?: number; 
  tag?: string;
}

export async function getNotes(params?: GetNotesParams) {
  const res = await privateApi.get("/notes", { params });
  return res.data; 
}

export async function fetchNoteById(id: string) {
  const res = await privateApi.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: { title: string; content: string; tag?: string }) {
  const res = await privateApi.post("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await privateApi.delete(`/notes/${id}`);
  return res.data;
}

// -------- CLIENT OBJECTS --------
export const authClient = { login, register, logout, session };
export const notesClient = { getNotes, fetchNoteById, createNote, deleteNote };
export const fetchNotes = getNotes; 

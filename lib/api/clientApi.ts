import axios from "axios";
import { User, AuthResponse } from "../../types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_HEADER = { Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}` };

// -------- AUTH --------
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { headers: AUTH_HEADER });
  return res.data;
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post(`${API_URL}/auth/register`, { email, password }, { headers: AUTH_HEADER });
  return res.data;
}

export async function logout() {
  const res = await axios.post(`${API_URL}/auth/logout`);
  return res.data;
}

export async function session(): Promise<User | null> {
  const res = await axios.get(`${API_URL}/auth/session`, { headers: AUTH_HEADER });
  return res.data?.user ?? null;
}

// -------- NOTES --------
export async function getNotes(params?: Record<string, string | number | boolean | undefined>) {
  const res = await axios.get(`${API_URL}/notes`, { headers: AUTH_HEADER, params });
  return res.data;
}
export const fetchNotes = getNotes;

export async function fetchNoteById(id: string) {
  const res = await axios.get(`${API_URL}/notes/${id}`, { headers: AUTH_HEADER });
  return res.data;
}

export async function createNote(data: { title: string; content: string; tag?: string }) {
  const res = await axios.post(`${API_URL}/notes`, data, { headers: AUTH_HEADER });
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await axios.delete(`${API_URL}/notes/${id}`, { headers: AUTH_HEADER });
  return res.data;
}

// -------- CLIENT OBJECTS (for backward compatibility) --------
export const authClient = { login, register, logout, session };
export const notesClient = { fetchNotes, fetchNoteById, createNote, deleteNote };

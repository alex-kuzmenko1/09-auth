import axios from "axios";
import { User } from "../../types/user";

const API_URL = `https://notehub-api.goit.study`;

const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --- AUTH ---
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  await publicApi.post("/auth/login", { email, password });
  await new Promise((resolve) => setTimeout(resolve, 100));
  const user = await session();
  if (!user) throw new Error("Failed to get user session after login");
  return { user, token: "" };
}

export async function register(email: string, password: string): Promise<{ user: User; token: string }> {
  await publicApi.post("/auth/register", { email, password });
  await new Promise((resolve) => setTimeout(resolve, 100));
  const user = await session();
  if (!user) throw new Error("Failed to get user session after registration");
  return { user, token: "" };
}

export async function logout() {
  await privateApi.post("/auth/logout");
}

export async function session(): Promise<User | null> {
  try {
    const res = await privateApi.get("/auth/session");
    return res.data.user || res.data;
  } catch {
    return null;
  }
}

// --- NEW: Update User ---
export async function updateUser(data: { name?: string; email?: string }) {
  const res = await privateApi.patch("/users/me", data);
  return res.data as User;
}

// --- NOTES ---
interface GetNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
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

// --- CLIENT OBJECTS ---
export const authClient = { login, register, logout, session, updateUser };
export const notesClient = { getNotes, fetchNoteById, createNote, deleteNote };

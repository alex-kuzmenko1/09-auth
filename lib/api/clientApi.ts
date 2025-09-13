export * from './clientApi';

import axios, { AxiosError } from "axios";
import { User, AuthResponse } from "../../types/user";

const API_URL = `https://notehub-api.goit.study`;

const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await publicApi.post("/auth/login", { email, password });
    
    console.log('Login response:', res.status, res.data);
    
    // API возвращает только статус 200, пользователя получаем через session
    if (res.status === 200) {
      // Небольшая задержка, чтобы cookies успели установиться
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Получаем пользователя через отдельный запрос
      const user = await session();
      
      if (!user) {
        throw new Error('Failed to get user session after login');
      }
      
      return { user, token: '' }; // Возвращаем в формате AuthResponse
    }
    
    throw new Error('Login failed');
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Login error:', axiosError.response?.status, axiosError.response?.data || axiosError.message);
    throw error;
  }
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await publicApi.post("/auth/register", { email, password });
    
    console.log('Register response:', res.status, res.data);
    
    // После регистрации тоже получаем пользователя через session
    if (res.status === 200 || res.status === 201) {
      // Небольшая задержка, чтобы cookies успели установиться
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const user = await session();
      
      if (!user) {
        throw new Error('Failed to get user session after registration');
      }
      
      return { user, token: '' };
    }
    
    throw new Error('Registration failed');
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Registration error:', axiosError.response?.status, axiosError.response?.data || axiosError.message);
    throw error;
  }
}

export async function logout() {
  const res = await privateApi.post("/auth/logout");
  return res.data;
}

export async function session(): Promise<User | null> {
  try {
    const res = await privateApi.get("/auth/session");
    
    // API может возвращать пользователя напрямую или в объекте { user }
    if (res.data) {
      return res.data.user || res.data;
    }
    
    return null;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

// -------- NOTES --------
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

// -------- CLIENT OBJECTS --------
export const authClient = { login, register, logout, session };
export const notesClient = { getNotes, fetchNoteById, createNote, deleteNote };
export const fetchNotes = getNotes;
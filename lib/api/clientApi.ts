import { nextServer } from "@/lib/api/api";
import type { User } from "@/types/user";

export interface Credentials {
  email: string;
  password: string;
}

// 🔐 регистрация
export async function signUp(credentials: Credentials): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
}

// 🔑 логин
export async function signIn(credentials: Credentials): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
}

// 🚪 логаут
export async function signOut(): Promise<void> {
  await nextServer.post("/auth/logout");
}

// 👤 мой профиль
export async function fetchProfile(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

// ✏️ обновить профиль
export async function updateProfile(username: string): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", { username });
  return data;
}

// ✅ проверка сессии
export async function checkSession(): Promise<boolean> {
  try {
    const { data } = await nextServer.get<{ success?: boolean }>("/auth/session");
    return !!data?.success;
  } catch {
    return false;
  }
}

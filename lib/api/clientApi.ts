"use client";

import { api } from "./api";
import { User } from "@/types/user";

// Тип для ответа сервера
interface AuthResponse {
  user: User;
  token?: string;
}

// 🔹 Регистрация
export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", { email, password });
  return data;
};

// 🔹 Вход
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
};

// 🔹 Выход
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// 🔹 Получение профиля
export const getProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/profile");
  return data;
};

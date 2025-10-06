"use client";

import { api } from "./api";
import { User } from "@/types/user";

// 🔹 регистрация
export const registerUser = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
};

// 🔹 вход
export const loginUser = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

// 🔹 выход
export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

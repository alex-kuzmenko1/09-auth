// 📁 lib/api/serverApi.ts
import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const checkServerSession = async (): Promise<AuthResponse | null> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) return null;

    const { data } = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });

    return data;
  } catch (err) {
    console.error("checkServerSession error:", err);
    return null;
  }
};

// ✅ Добавь эту функцию
export const getProfile = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const { data } = await api.get<User>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (err) {
    console.error("getProfile error:", err);
    return null;
  }
};

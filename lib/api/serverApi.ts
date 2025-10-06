import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";

export const getProfile = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.toString();

    const { data } = await api.get("/users/me", {
      headers: { Cookie: token },
    });

    return data;
  } catch {
    return null;
  }
};

"use client";

import { useEffect } from "react";
import { getProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        if (profile) setUser(profile);
      } catch {
        clearUser();
      }
    })();
  }, [setUser, clearUser]);

  return <>{children}</>;
};

"use client";

import { ReactNode, useEffect, useState } from "react";
import { getProfile } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getProfile();
      if (user) {
        setUser(user);
      } else {
        clearAuth();
      }
      setLoading(false);
    })();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

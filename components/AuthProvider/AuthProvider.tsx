'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
import { User } from '../../types/user';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      } else {
        router.push('/sign-in');
      }
    };

    if (!user) {
      checkAuth();
    }
  }, [user, setUser, router]);

  return <>{children}</>;
}

import { useAuthStore } from '@/lib/store/authStore';
import React from 'react';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className={css.mainContent}>
      <h1 className={css.title}>Profile</h1>
      <p className={css.text}>
        Name: {user?.name ?? 'Not provided'}
      </p>
      <p className={css.text}>
        Email: {user?.email ?? 'Not logged in'}
      </p>
    </main>
  );
}

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../lib/store/authStore';
import { authClient } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    try {
      const updatedUser = await authClient.updateUser({ name, email });
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to update user:', err);
    }

    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <div className={css.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={css.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
}

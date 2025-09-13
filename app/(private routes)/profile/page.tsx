import { headers } from 'next/headers';
import React from 'react';
import css from './ProfilePage.module.css';

export default async function ProfilePage() {
  try {
    const h = await headers(); // ✅ додали await
    const authHeader = h.get('authorization');

    return (
      <main className={css.mainContent}>
        <h1 className={css.title}>Profile</h1>
        <p className={css.text}>
          Auth header: {authHeader ?? 'Not logged in'}
        </p>
      </main>
    );
  } catch (err) {
    // eslint каже, що 'err' не використовується → можна або залогувати, або прибрати
    console.error(err);
    return (
      <main className={css.mainContent}>
        <h1 className={css.title}>Profile</h1>
        <p className={css.text}>Error loading profile</p>
      </main>
    );
  }
}

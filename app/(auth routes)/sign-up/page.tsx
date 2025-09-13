'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../../lib/api/clientApi';
import { useAuthStore } from '../../../lib/store/authStore';
import { AxiosError } from 'axios';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting registration...');
      
      const authResponse = await authClient.register(email, password);
      
      console.log('Registration response:', authResponse);
      
      if (!authResponse.user) {
        throw new Error('No user data received');
      }

      setUser(authResponse.user);
      console.log('User set in store:', authResponse.user);
      
      router.push('/profile');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={css.actions}>
          <button 
            type="submit" 
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

import axios from 'axios';
import { User } from '../../types/user';

const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? '') + '/api';

export const serverApi = {
  async getUserFromServer(cookiesHeader?: string) {
    const res = await axios.get(`${baseURL}/users/me`, {
      headers: {
        Cookie: cookiesHeader ?? '',
      },
      withCredentials: true,
    });
    return res.data as User;
  },

  async getSession(cookiesHeader?: string) {
    try {
      const res = await axios.get(`${baseURL}/auth/session`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
      });
      return res.data as User | null;
    } catch {
      return null; // err убран, чтобы ESLint не ругался
    }
  },

  // Для серверного отримання нотаток
  async getNotesServer(
    cookiesHeader?: string,
    params?: Record<string, string | number | boolean>
  ) {
    const res = await axios.get(`${baseURL}/notes`, {
      headers: { Cookie: cookiesHeader ?? '' },
      withCredentials: true,
      params,
    });
    return res.data;
  },
};

import axios from 'axios';
import { User } from '../../types/user';

const baseURL = 'https://notehub-api.goit.study';

export const serverApi = {
  async getUserFromServer(cookiesHeader?: string) {
    try {
      const res = await axios.get(`${baseURL}/users/me`, {
        headers: {
          Cookie: cookiesHeader ?? '',
        },
        withCredentials: true,
      });
      return res.data as User;
    } catch (error) {
      console.error('Get user from server error:', error);
      throw error;
    }
  },

  async getSession(cookiesHeader?: string) {
    try {
      const res = await axios.get(`${baseURL}/auth/session`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
      });
      
      // Обрабатываем разные форматы ответа от API
      if (res.data) {
        return (res.data.user || res.data) as User;
      }
      
      return null;
    } catch (error) {
      console.error('Get session from server error:', error);
      return null;
    }
  },

  // Для серверного получения заметок
  async getNotesServer(
    cookiesHeader?: string,
    params?: Record<string, string | number | boolean>
  ) {
    try {
      const res = await axios.get(`${baseURL}/notes`, {
        headers: { Cookie: cookiesHeader ?? '' },
        withCredentials: true,
        params,
      });
      return res.data;
    } catch (error) {
      console.error('Get notes from server error:', error);
      throw error;
    }
  },
};
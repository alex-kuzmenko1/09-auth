import axios from 'axios';

export const serverApi = {
  async getUser(token: string) {
    const res = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async refreshSessionIfNeeded(refreshToken: string) {
    if (!refreshToken) return null;
    try {
      const res = await axios.post('/api/auth/refresh', { refreshToken });
      return res.data;
    } catch {
      return null;
    }
  },
};

export default serverApi;

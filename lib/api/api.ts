import axios from 'axios';

// Создаем общий экземпляр axios с настройками для работы с cookies
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true, // Важно для поддержки cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Можно добавить interceptors для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
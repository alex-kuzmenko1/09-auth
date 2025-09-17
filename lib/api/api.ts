// Преднастроенный экземпляр axios, используемый в clientApi и serverApi
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://notehub-api.goit.study';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // timeout: 10000,
});

// Экспорт по-умолчанию и именованный экспорт для консистентности
export default api;

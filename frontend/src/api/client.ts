import axios from 'axios';
import { authStore } from '@/auth/store';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const http = axios.create({
  baseURL,
  withCredentials: false,
});

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const processQueue = (token: string | null) => {
  pendingQueue.forEach(cb => cb(token));
  pendingQueue = [];
};

http.interceptors.request.use(config => {
  const token = authStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push(token => {
            if (!token) {
              reject(error);
              return;
            }
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(http(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await authStore.getState().refreshSession();
        processQueue(newTokens?.accessToken ?? null);
        if (newTokens?.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        }
        return http(originalRequest);
      } catch (refreshError) {
        processQueue(null);
        authStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

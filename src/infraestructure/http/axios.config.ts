import { clearAuthStorage, getAuthHeader, isTokenExpired } from "@/src/application/auth/helpers/token.helper";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:44306/api/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_ROUTES = [
  '/login'
];

const isPublicRoute = (url: string | undefined): boolean => {
  if (!url) return false;
  return PUBLIC_ROUTES.some(route => url.includes(route));
};

api.interceptors.request.use(
  (config) => {

    if (isPublicRoute(config.url)) {
      return config;
    }

    if (isTokenExpired()) {
      clearAuthStorage();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      return Promise.reject(new Error('Token expirado'));
    }

    const authHeader = getAuthHeader();

    if (authHeader) {
      config.headers.Authorization = authHeader;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthStorage();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
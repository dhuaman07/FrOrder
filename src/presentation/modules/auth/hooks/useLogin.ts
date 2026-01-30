'use client';

import { useState } from 'react';
import { loginUseCase } from '@/src/application/auth/usecases/login.usecase';
import { ApiResponse } from '@/src/presentation/shared/types/api-response';
import { LoginResponse } from '@/src/application/auth/types/login-response';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (): Promise<ApiResponse<LoginResponse>> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const ipAddress = await getClientIP();
      const credentials = {
        email,
        password,
        ipAddress,
      };

      const response = await loginUseCase(credentials);

      if (response.isSuccess && response.data) {
        const now = Date.now();
        const expiresMS = response.data.expiresIn;
        const expirationTime = now + expiresMS;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('tokenType', response.data.tokenType);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('tokenExpiration', expirationTime.toString());
        }
      }
      return response;

    } catch (error) {
      return {
        isSuccess: false,
        message: error instanceof Error ? error.message : "Error desconocido",
        data: undefined,
        errors: [error instanceof Error ? error.message : "Error desconocido"],
      } as ApiResponse<LoginResponse>;
    } finally {
      setLoading(false);
    }
  };

  async function getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return '0.0.0.0';
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    login,
    loading,
  };
}
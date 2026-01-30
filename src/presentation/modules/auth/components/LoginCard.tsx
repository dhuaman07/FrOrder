'use client';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useLogin } from '../hooks/useLogin';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export function LoginCard() {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const { email, password, setEmail, setPassword, login, loading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login();

    if (result.isSuccess) {
      toast.current?.show({
        severity: 'success',
        summary: '¡Bienvenido!',
        detail: result.message,
        life: 2000,
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      const errorMessage = result.errors?.[0] || result.message;

      toast.current?.show({
        severity: 'error',
        summary: 'Error de autenticación',
        detail: errorMessage,
        life: 5000,
      });
    }
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #3B82F6, #6366F1)',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
  };

  return (
    <>
      <Toast ref={toast} />

      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <i className="pi pi-user text-white text-3xl"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-gray-500 text-sm">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">
              <i className="pi pi-envelope mr-2"></i>
              Correo Electrónico
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700">
              <i className="pi pi-lock mr-2"></i>
              Contraseña
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              toggleMask
              feedback={false}
              className="w-full"
              inputClassName="w-full"
              required
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="cursor-pointer" />
              <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                Recordarme
              </label>
            </div>
          </div>

          <Button
            type="submit"
            label={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            icon={loading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'}
            loading={loading}
            className="w-full"
            style={buttonStyle}
            size="large"
          />
        </form>
      </Card>
    </>
  );
}
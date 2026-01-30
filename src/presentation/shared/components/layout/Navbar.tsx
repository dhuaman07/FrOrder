'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { useAuth } from '@/src/presentation/modules/auth/hooks/useAuth';

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarVisible: boolean;
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onMenuToggle,
  sidebarVisible,
  title = 'Dashboard',
  subtitle = 'Gestión de Pedidos',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);

      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Nuevo usuario registrado',
      description: 'Juan Pérez se registró en el sistema',
      time: 'Hace 5 minutos',
      color: 'bg-blue-500',
      read: false
    }
  ];

  const getUserInitials = () => {
    if (user) {
      const firstInitial = user.firstName?.charAt(0) || '';
      const lastInitial = user.lastName?.charAt(0) || '';
      return (firstInitial + lastInitial).toUpperCase() || 'U';
    }
    return 'U';
  };

  const getUserFullName = () => {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return 'Usuario';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          icon={sidebarVisible ? 'pi pi-times' : 'pi pi-bars'}
          className="p-button-text p-button-rounded"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        />

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button icon="pi pi-search" className="p-button-text p-button-rounded" />

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <i className="pi pi-bell text-lg" />
            <Badge value="3" severity="danger" className="absolute top-1 right-1" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadein">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">Notificaciones</div>
                    <div className="text-xs text-gray-500 mt-1">Tienes 3 notificaciones nuevas</div>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Marcar todas como leídas
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${notification.color} rounded-full mt-1.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 text-center border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full py-1">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <Avatar
            label={getUserInitials()}
            className="bg-blue-500 cursor-pointer"
            shape="circle"
            onClick={() => setShowUserMenu((v) => !v)}
          />

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadein">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="font-semibold text-gray-900">{getUserFullName()}</div>
                <div className="text-xs text-gray-500 mt-1">{user?.email}</div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                  <i className="pi pi-user" />
                  <span className="text-sm">Mi Perfil</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                  <i className="pi pi-cog" />
                  <span className="text-sm">Configuración</span>
                </button>
                <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                  <i className="pi pi-wallet" />
                  <span className="text-sm">Cuenta</span>
                </button>
              </div>

              <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                  <i className="pi pi-question-circle" />
                  <span className="text-sm">Ayuda</span>
                </button>
              </div>

              <div className="border-t border-gray-200 py-2">
                <button
                  className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                  onClick={logout}
                >
                  <i className="pi pi-sign-out" />
                  <span className="text-sm">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
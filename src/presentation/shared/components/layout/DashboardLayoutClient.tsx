'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onMenuToggle={toggleSidebar}
        sidebarVisible={sidebarVisible}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          visible={sidebarVisible}
          onToggle={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
